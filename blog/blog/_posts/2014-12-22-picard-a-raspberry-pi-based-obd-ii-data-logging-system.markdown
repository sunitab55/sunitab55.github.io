---
layout: post
title: 'picard: A Raspberry Pi based OBD-II data logging system'
date: 2014-12-22 14:34:13.000000000 -06:00
---
### Introduction

For a while I have wanted to read data from a car's On
Board Diagnostics port (also called the OBD-II port). This is what the port looks like:
![obdii port](https://souvik.me/static/454984.11-lg.jpg)

Found on all vehicles to be sold in the United States  manufactured after 1996, this port allows one to communicate with the car's Engine Control Unit (ECU) over the OBD-II protocol. While it is typically used to diagnose engine problems when the "check engine" light is on, it can also provide real-time data. My project, which I have named "Picard" (Raspberry **Pi** **Car** **D**ata Logging), uses the real time data provided by the ECU over the OBD-II port for graphing and analysis.

### The OBD-II Protocol
The OBD-II protocol is rather simple in theory, but in practice manufacturer-specific additions and omissions from the official specification make communication more difficult. To communicate with the ECU, OBD-II Parameter IDs (PIDs) are sent, and the ECU responds with anywhere from one to twenty bytes. Wikipedia has a comprehensive list of OBD-II PIDs, which can be found [here](http://en.wikipedia.org/wiki/OBD-II_PIDs) [1]. PIDs are grouped into modes which range from Mode 01 to Mode 09. The mode my project is particularly concerned with is Mode 01, because that mode provides real-time data. Other modes, such as Mode 03, provide Diagnostic Trouble Codes (DTCs) and general information like the Vehicle Identification Number. Here is a shortened list of Mode 01 PIDs from the linked Wikipedia page.

<table style="text-align: center; margin: 0 auto; display: inline-table;" align="center">
<tbody><tr>
<th>PID (hex)</th>
<th>Bytes returned</th>
<th>Description</th>
<th>Formula<sup id="cite_ref-formula_2-0" class="reference"></sup></th>
</tr>
<tr>
<td><tt>00</tt></td>
<td>4</td>
<td align="left">PIDs supported [01 - 20]</td>
<td align="left">Bit encoded </td>
</tr>
<tr>
<td><tt>01</tt></td>
<td>4</td>
<td align="left">Monitor status since DTCs cleared. </td>
<td align="left">Bit encoded. </td>
</tr>
<tr>
<td><tt>02</tt></td>
<td>2</td>
<td align="left">Freeze DTC</td>
<td align="left"></td>
</tr>
<tr>
<td><tt>03</tt></td>
<td>2</td>
<td align="left">Fuel system status</td>
<td align="left">Bit encoded. </td>
</tr>
<tr>
<td><tt>04</tt></td>
<td>1</td>
<td align="left">Calculated engine load value</td>
<td align="left">A*100/255</td>
</tr>
<tr>
<td><tt>05</tt></td>
<td>1</td>
<td align="left">Engine coolant temperature</td>
<td align="left">A-40</td>
</tr>
<tr>
<td><tt>0A</tt></td>
<td>1</td>
<td align="left">Fuel pressure</td>
<td align="left">A*3</td>
</tr>
<tr>
<td><tt>0B</tt></td>
<td>1</td>
<td>Intake pressure</td>
<td align="left">A</td>
</tr>
<tr>
<td><tt>0C</tt></td>
<td>2</td>
<td align="left">Engine RPM</td>
<td align="left">((A*256)+B)/4</td>
</tr>
<tr>
<td><tt>0D</tt></td>
<td>1</td>
<td align="left">Vehicle speed</td>
<td align="left">A</td>
</tr>
<tr>
<td><tt>11</tt></td>
<td>1</td>
<td align="left">Throttle position</td>
<td align="left">A*100/255</td>
</tr>
<tr>
<td><tt>1C</tt></td>
<td>1</td>
<td align="left">OBD standards this vehicle conforms to</td>
<td align="left">Bit encoded. </td>
</tr>
<tr>
<td><tt>1E</tt></td>
<td>1</td>
<td align="left">Auxiliary input status</td>
<td align="left">A0 = 1 means active</td>
</tr>
<tr>
<td><tt>1F</tt></td>
<td>2</td>
<td align="left">Run time since engine start</td>
<td align="left">(A*256)+B</td>
</tr>
<tr>
</tbody></table>

The complete list of Mode 01 PIDs is extremely long, but not all cars implement all PIDs. One can find which PIDs are supported through Mode 01 PID 00h, Mode 01 PID 20h, Mode 01 PID 40h, and Mode 01 PID 80h, which return 4 bytes in Bit Encoded Notation. Bit Encoded Notation specifies which of the following 32 PIDs are supported (for example, the result of Mode 01 PID 00h encodes the availibility of Mode 01 PIDs 01h to 20h. The following table explains how Bit Encoded Notation works:

<table class="wikitable" style="text-align: center; margin: 0 auto; display: inline-table;">
<tr align="center">
<td colspan="8">A</td>
<td colspan="8">B</td>
</tr>
<tr align="center">
<td>A7</td>
<td>A6</td>
<td>A5</td>
<td>A4</td>
<td>A3</td>
<td>A2</td>
<td>A1</td>
<td>A0</td>
<td>B7</td>
<td>B6</td>
<td>B5</td>
<td>B4</td>
<td>B3</td>
<td>B2</td>
<td>B1</td>
<td>B0</td>
</tr>
</table>

<table class="wikitable" style="text-align: center; margin: 0 auto; display: inline-table;">
<tr align="center">
<td colspan="8">C</td>
<td colspan="8">D</td>
<tr align="center">
<td>C7</td>
<td>C6</td>
<td>C5</td>
<td>C4</td>
<td>C3</td>
<td>C2</td>
<td>C1</td>
<td>C0</td>
<td>D7</td>
<td>D6</td>
<td>D5</td>
<td>D4</td>
<td>D3</td>
<td>D2</td>
<td>D1</td>
<td>D0</td>
</tr>
</table>

The four bytes returned by the ECU are titled A, B, C, and D. Each of the 8 bits in every byte corresponds to 1 of the following 32 PIDs. A "1" bit means that the corresponding PID is supported, while a "0" bit means that the PID is unsupported.

To read data from the ECU, the PID must be sent and the bytes the ECU sends back must be decoded. For example, to read the coolant temperature, one would send "0105" to the ECU ("01" for Mode 01, and "05" for PID 05h), and get one byte back. After converting this byte from hexadecimal to decimal, one has to subtract 40 to get the coolant temperature, in degrees Celsius.

### Hardware
* Raspberry Pi Model B+
* TP-LINK WN725N v2 USB Wi-Fi adapter
* Plugable Bluetooth 4.0 USB adapter
* iSaddle Super Mini Bluetooth OBD-II scanner (ELM327 chip)
* 32GB SanDisk MicroSD card
* Raspberry Pi case (optional)

The Raspberry Pi in its case and the Bluetooth adapter:
![hardware](https://souvik.me/static/CAM01306.jpg)

Closeup of the Raspberry Pi:
![raspberrypi](https://souvik.me/static/CAM01307.jpg)

Wi-Fi and Bluetooth adapters:
![wifibluetooth](https://souvik.me/static/CAM01308.jpg)

OBD-II adapter plugged into the car:
![obdiipins](https://souvik.me/static/CAM01310.jpg)

Raspberry Pi plugged into USB power communicating with the OBD-II adapter over Bluetooth:
![comms](https://souvik.me/static/CAM01313.jpg)

### Structure of the project
![flowchart](https://souvik.me/static/flowchart.png)

My project consists of three parts: a Python program that runs on the Raspberry Pi, another Python program that exposes the collected data through an API, and the user interface which uses the API to receive and plot the data.

#### The Raspberry Pi component

The Python program on the Raspberry Pi interfaces with the Bluetooth OBD-II adapter. To make my code more organized and readable, I split up the code interfacing with the adapter and the code that uses the ECU to log data to a file, which can be graphed later. 

The code that interfaces with the Bluetooth adapter is called `obdython`. `obdython` works by abstracting the connection and protocol information away from the client program. For example, instead of manually sending hexadecimal strings to the ECU, one would only have to do the following to read the RPM from a Bluetooth OBD-II adapter:

```
from obdython import Device, OBDPort
import time
dev = Device(Device.types['bluetooth'], bluetooth_mac="AA:BB:CC:11:22:33", bluetooth_channel=1)
port = OBDPort(dev)
time.sleep(0.1) # Program needs to wait for adapter to come online
port.connect()
time.sleep(0.1)
port.ready()
print(port.sensor('rpm'))
```

Decoding the ECU's output and maintaining the state of the OBD-II adapter is all handled by my package to reduce complexity of client code. This is `obdython`'s complete feature list:

* Communicate with ELM327-based Bluetooth, USB, and serial port OBD-II adapters
* Read from any OBD-II sensor
* Decode ECU output
* Send `AT` commands to control the adapter
* Gracefully handle communication errors

`obdython` is based on `pyOBD`, written by Donour Sizemore (donour@uchicago.edu) and Secons Ltd. ([www.obdtester.com](http://www.obdtester.com)). However, `pyOBD` did more than just reading data from the ECU; it also handled graphical operations and outputted data to an LCD screen. Since I wanted a "headless" setup, I did not have a LCD screen and thus had no use for the graphical functionalities. The existing code also did not have any support for Bluetooth OBD-II devices; it only supported USB and serial port OBD-II devices. Although Secons Ltd. and Sizemore's code was a good place to start, it was not updated for Python version 3 and there were many errors and bugs that I encountered while testing. I packaged my edited code as a Python package so that I could build it independently of my other code, and so that I could publish my package on Python software indexes such as [PyPI](https://pypi.python.org/pypi)[2]. I named my package `obdython` in order to differentiate it from `pyobd`.

I also wrote a program, called `recorder.py`, that uses my library to connect to the ECU and records the data from the ECU to a comma separated value (CSV) file on the Raspberry Pi's MicroSD card. Because my library handles the connection, my recording code is fairly short. Here is the complete source code of `recorder.py`.

```
from obdython import Device, OBDPort, SENSORS
import time
import sys
import argparse
import csv
import signal
import sys

quit = False

def signal_term_handler(signal, frame):
	print("quitting...")
	global quit
	quit = True

signal.signal(signal.SIGTERM, signal_term_handler)

def main():
	def devtype(val):
		if val != "bluetooth" and val != "serial":
			raise argparse.ArgumentTypeError("must be either bluetooth or serial")
		return val

	parser = argparse.ArgumentParser(description='Record OBD-II data')
	parser.add_argument('-d','--devicetype', help='type of device (bluetooth or serial)',type=devtype, required=True)
	parser.add_argument('-m','--bluetoothmac', help='bluetooth MAC address')
	parser.add_argument('-c','--bluetoothchannel', help='bluetooth channel', default=1, type=int)
	parser.add_argument('-s','--serialdevice', help='serial device to use (like /dev/ttyS1)')
	parser.add_argument('-t','--timeout', help='device timeout', default=60, type=int)
	parser.add_argument('-r','--sensors', help='sensors to read: '+', '.join(list(SENSORS.keys())), nargs="+", required=True)
	parser.add_argument('-o','--output', help='output file', required=True)
	args = parser.parse_args()
	if args.devicetype == "bluetooth":
		device = Device(Device.types['bluetooth'],bluetooth_mac=args.bluetoothmac,bluetooth_channel=args.bluetoothchannel, timeout=args.timeout)
	else:
		device = Device(Device.types['serial'],serial_device=args.serialdevice,timeout=args.timeout)
	port = OBDPort(device)
	time.sleep(0.1)
	port.connect()
	time.sleep(0.1)
	port.ready()
	print("Version: "+port.get_elm_version())


	with open(args.output, 'w') as csvfile:
		header = list(args.sensors)
		header.insert(0,'time')
		writer = csv.DictWriter(csvfile, fieldnames=header)
		writer.writeheader()
		starttime = time.time()
		global quit
		while quit == False:
			begin = time.time()
			dict = {}
			for sensor in args.sensors:
				val = port.sensor(sensor)[1]
				print((sensor,val))
				dict[sensor] = val
			dict['time'] = time.time()-starttime
			writer.writerow(dict)
			length = 1.0 - (time.time() - begin)
			if length > 0:
				time.sleep(length)
	port.close()
	sys.exit(0)

if __name__ == "__main__":
	main()
```


`recorder.py` uses the command line to determine the device to connect to and the sensors to read. For example, the following command would read the RPM, engine load, and speed from a Bluetooth OBD-II device with the MAC address AA:BB:CC:DD:EE:FF on Bluetooth channel 1, and output data to the file `output.csv`.

``` 
pi@raspberry$ python3 recorder.py -d bluetooth -m AA:BB:CC:11:22:33 -c 1 -r rpm load speed -o output.csv
```

### The API component

Once I obtain the CSV file from `recorder.py`, I can plot it using any statistics or spreadsheet software, but I wanted to load it into a database in order to be able to perform more comprehensive analytics. 

The database interfacing program is called `api.py`. It has the following features:

* Communicate with a SQLite3 database
* Serve requested data over HTTP
* Input uploaded data into the database

This program opens a connection to a SQLite3 database and uses the `bottle` web framework to provide a simple, `HTTP GET` based API through which a  program can request data between any two periods in time using the Unix Epoch millisecond representation (the number of milliseconds elapsed since 00:00:00 Coordinated Universal Time, Thursday, 1 January 1970).  For example, the following HTTP method would get a 1999 Honda Accord's RPM between 21 Jun 2014 23:17:08 GMT and 22 Dec 2014 23:19:22 GMT:

`GET https://souvik.me/picard/api/get/accord/1403392628000/1419290362000/rpm`

This can be called through jQuery too:

```
$.ajax({
	type:"GET",
	url: "https://souvik.me/picard/api/get/accord/1403392628000/1419290362000/rpm",
	success:function(msg){
		var data=JSON.parse(msg)
	}
})
```

`api.py` returns a JSON formatted array with the following format:

```
[
	[timestamp0, value0],
    [timestamp1, value1],
    [timestamp2, value2],
    ...
]
```

To load data into the database, I directly upload the CSV file to the server. This can be done using `httpie` or `curl`:

```
$ http -f POST https://souvik.me/picard/api/upload vehicle_id="accord" initial_time="$(date +%s)" upload@output.csv
```

Since the Raspberry Pi does not have a Real Time Clock (RTC), it cannot keep the time across reboots. To work around this problem, I copy the file to my computer (which does have a RTC) over Wi-Fi and specify the initial time in Unix Epoch format (this time in seconds). `date +%s` on most Unix systems returns the current Unix Epoch time, and through command substitution this can be inserted into the command line. 

### User interface

The third component of my project is the user interface. I am using [Bootstrap](http://getbootstrap.com/) [3], [jQuery](http://jquery.com/) [4], [Moment.js](http://momentjs.com/) [5], [Highcharts](http://www.highcharts.com/) [6], and [Bootstrap Date Range Picker](https://github.com/dangrossman/bootstrap-daterangepicker) [7]. It has the following features:

* Display the data in an easy-to-understand format
* Allow the user to zoom into any period of time
* Allow the user to easily select data to view between two points in time
* Allow the user to easily select which vehicle's data to view

I used Bootstrap to create a responsive website that works on both desktop and mobile devices, jQuery to simplify scripting of HTML, Moment.js to parse dates, Highcharts to create visually appealing charts, and Bootstrap Date Range Picker to display an interactive calendar to choose beginning and ending dates. I especially like Highcharts because it is very simple to use and has cool features, such as zooming and animations.

I have created three graphs on my website. The main graph plots RPM, speed, engine load, and temperature on one graph using four different axes. The secondary graph on the bottom left graphs speed and acceleration, which I calculate by taking the derivative of speed. The secondary graph on the bottom right graphs the distance the car has traveled, which I calculate by integrating speed over time (using the trapezoidal sum). The calendar text input field allows the user to view data between specific dates, and the vehicle ID selection dropdown on the right allows the user to choose which vehicle's data to graph, in the event that more than one vehicle's data is uploaded to the server.

![Screenshot1](https://souvik.me/static/picard_screenshot.png)

![Screenshot2](https://souvik.me/static/picard_screenshot_2.png)

![Screenshot3](https://souvik.me/static/picard_screenshot_3.png)


### Conclusions

#### Applications

My project has a lot of applications. My project is extremely extensible, and could be used applications such as the following:

* Monitoring driving habits
* Targeted advertisement
* Fuel economy analysis

OBD-II analytics can be very helpful in monitoring driving habits. Consider a device that allows parents to monitor their children's driving to teach them about safety and proper driving techniques. This kind of device would reduce accident rates and create better drivers. Progressive Insurance has a device called *Snapshot* which analyzes driving habits and rewards good driving with up to a 30% discount. This device plugs into the OBD-II port and uses the real-time PIDs to read data, much like my project. 

OBD-II analytics can also be used for data mining and targeted advertisement. One example of how vehicle analytics could be used in this manner is automatically advertising repair services when the "check engine" light turns on. Agnik, LLC, a company that specializes in mobile and distributed data mining software, has a patent on "Onboard vehicle data mining, social networking, and pattern-based advertisement ([US 20110258044 A1](http://www.google.com/patents/US20110258044) [8])." 

When designing this project, I envisioned plotting fuel level on the same graph as RPM and speed to see how changes in engine state affect fuel economy. Unfortunately, the car I was using for testing did not support reporting fuel level over OBD-II, but in newer cars this functionality is more prevalent. This kind of analytics would probably benefit consumers the most because it would allow one to identify what kinds of driving habits minimize fuel consumption. Not only would it save a few dollars at the gas station, it would also help to reduce global pollution.

#### Approximate time spent:
* 10 hours planning and buying hardware
* 7 hours setting up Raspberry Pi
* 17 hours writing the `obdython` library
* 17 hours debugging connection issues between the Bluetooth adapter and my library
* 8 hours writing and testing `recorder.py`
* 11 hours writing and testing `api.py`
* 10 hours writing and testing HTML and JavaScript for my website

#### Future work

In the future I will work on the following functionalities and enhancements:

* Security enhancements to require authentication when uploading data and to prevent attacks like SQL injection
* Ability to seamlessly use different types of databases (SQLite3, MySQL, PostgreSQL, MongoDB, Redis, etc.)
* GPS logging to show routes on a map and combine with OBD-II data for analytics
* Documenting the API and `obdython`'s usage


### Links
[1] http://en.wikipedia.org/wiki/OBD-II_PIDs <br>
[2] https://pypi.python.org/pypi <br>
[3] http://getbootstrap.com/ <br>
[4] http://jquery.com/ <br>
[5] http://momentjs.com/ <br>
[6] http://www.highcharts.com/ <br> 
[7] https://github.com/dangrossman/bootstrap-daterangepicker <br>
[8] http://www.google.com/patents/US20110258044 <br>

### Appendix

All code can be found on https://github.com/souvik1997/picard and https://souvik.me/cgit/picard/.

Graphs: https://souvik.me/picard

My GitHub profile: https://github.com/souvik1997

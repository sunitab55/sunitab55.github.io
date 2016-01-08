---
layout: post
title: Getting the TP-LINK WN725N v2 working on the Raspberry Pi
date: 2014-12-05 19:11:34.000000000 -06:00
---
The TP-LINK WN725N is a fairly inexpensive (~$11) USB Wi-Fi adapter that apparently comes in two versions (which is actually quite common among Wi-Fi hardware manufacturers). I have the TP-LINK WN725N v2 with a USB device ID of `0bda:8179`. It does not use too much power so you don't need an externally powered USB hub, and its low profile lets you keep it semi-permanently plugged in to your Pi.

![TP-LINK WN725N v2](https://souvik.me/static/wn725nv2.jpg)

Getting this to work on Raspbian was a chore, even after following multiple tutorials and finding configurations and drivers. Hopefully the following tutorial will help with getting this adapter working on the Raspberry Pi.

# Connecting the TP-LINK WN725N v2 to your existing Wi-Fi network

### Preparation and Drivers

Connect your Pi to Ethernet and SSH into it. Next install `git` and `build-essential`. You will also need `libnl-dev` and the Linux kernel headers to compile the drivers. Since Raspbian does not provide the Linux kernel headers for its kernels I had to install `linux-image-3.12-1-rpi` and `linux-headers-3.12-1-rpi`, which were the latest kernels at the time of this writing. You should install the latest versions available, which you can find with `apt-cache search linux-image`. Edit /boot/config.txt to set the Raspberry Pi to boot into the new kernel:


```
# For more options and information see
# http://www.raspberrypi.org/documentation/configuration/config-txt.md
# Some settings may impact device functionality. See link above for details

# uncomment if you get no picture on HDMI for a default "safe" mode
#hdmi_safe=1

# uncomment this if your display has a black border of unused pixels visible
# and your display can output without overscan
disable_overscan=1

# uncomment the following to adjust overscan. Use positive numbers if console
# goes off screen, and negative if there is too much border
#overscan_left=16
#overscan_right=16
#overscan_top=16
#overscan_bottom=16

# uncomment to force a console size. By default it will be display's size minus
# overscan.
#framebuffer_width=1280
#framebuffer_height=720

# uncomment if hdmi display is not detected and composite is being output
#hdmi_force_hotplug=1

# uncomment to force a specific HDMI mode (this will force VGA)
#hdmi_group=1
#hdmi_mode=1

# uncomment to force a HDMI mode rather than DVI. This can make audio work in
# DMT (computer monitor) modes
#hdmi_drive=2

# uncomment to increase signal to HDMI, if you have interference, blanking, or
# no display
#config_hdmi_boost=4

# uncomment for composite PAL
#sdtv_mode=2

#uncomment to overclock the arm. 700 MHz is the default.
#arm_freq=800

#REPLACE WITH YOUR KERNEL VERSION
kernel=vmlinuz-3.12-1-rpi 
initramfs initrd.img-3.12-1-rpi followkernel
```
Reboot your Pi and SSH in again. Then either go to https://github.com/lwfinger/rtl8188eu and download the latest release as a zip file using `wget` or any command line downloader, or use `git clone https://github.com/lwfinger/rtl8188eu.git` to download the drivers. Go into the rtl8188eu folder using `cd` and type `make`. This will take a *very* long time and use 100% of your CPU power, so it would make your Pi useless for about a 30 minutes to an hour. Once it has compiled, run `sudo make install` to install the drivers to `/lib/modules/$(uname -r)/kernel/drivers/net/wireless/8188eu.ko` and the firmware to `/lib/firmware/rtlwifi/rtl8188eufw.bin`. Reboot your Pi for the firmware to load.

### Setting up `wpa_supplicant` (for WPA home networks)

`wpa_supplicant` is one of the lightest Wi-Fi connection managers available. Install it with `sudo apt-get install wpa_supplicant`. You can edit `/etc/wpa_supplicant/wpa_supplicant.conf` to input your network settings.

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
        ssid="YOUR_SSID"
        psk="YOUR_PASSPHRASE"
}
```

Next edit `/etc/network/interfaces` to connect to the network automatically at startup.

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp
```

You can test your setup without rebooting by running the following command: `sudo wpa_supplicant  -Dwext -iwlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf`.

# Using the TP-LINK WN725N v2 as an Access Point

I wanted to have the Raspberry Pi act as an access point instead of connecting to Wi-Fi because the adapter is not very powerful and drops the signal frequently. For a headless system, this would mean that I would have no way to control the Pi without connecting a monitor and a keyboard. However, by having it act as an access point I could directly connect my phone or my laptop to the Raspberry Pi wirelessly and use SSH. Using this adapter as an access point was a lot harder than simply using it to connect to Wi-Fi.

### Compiling `hostapd`

`hostapd` is a program that creates access points (SoftAPs). Unfortunately, the version of `hostapd` in Raspbian's repositories doesn't support this adapter (at least not with this kernel; later kernels seem to include the rtl8188eu driver in mainline with full nl80211 interface capability capability). The rtl8188eu driver downloaded from GitHub earlier contains the source code to a version of `hostapd` that should work. To compile this version of `hostapd`, first edit `hostapd-8.0/hostapd/defconfig`

```
# Example hostapd build time configuration
#
# This file lists the configuration options that are used when building the
# hostapd binary. All lines starting with # are ignored. Configuration option
# lines must be commented out complete, if they are not to be included, i.e.,
# just setting VARIABLE=n is not disabling that variable.
#
# This file is included in Makefile, so variables like CFLAGS and LIBS can also
# be modified from here. In most cass, these lines should use += in order not
# to override previous values of the variables.

# Driver interface for Host AP driver
#CONFIG_DRIVER_HOSTAP=y
CONFIG_DRIVER_RTW=y

# Driver interface for wired authenticator
#CONFIG_DRIVER_WIRED=y

# Driver interface for madwifi driver
#CONFIG_DRIVER_MADWIFI=y
#CFLAGS += -I../../madwifi # change to the madwifi source directory

# Driver interface for drivers using the nl80211 kernel interface
#CONFIG_DRIVER_NL80211=y

# Driver interface for FreeBSD net80211 layer (e.g., Atheros driver)
#CONFIG_DRIVER_BSD=y
#CFLAGS += -I/usr/local/include
#LIBS += -L/usr/local/lib
#LIBS_p += -L/usr/local/lib
#LIBS_c += -L/usr/local/lib

# Driver interface for no driver (e.g., RADIUS server only)
#CONFIG_DRIVER_NONE=y

# IEEE 802.11F/IAPP
#CONFIG_IAPP=y

# WPA2/IEEE 802.11i RSN pre-authentication
#CONFIG_RSN_PREAUTH=y

# PeerKey handshake for Station to Station Link (IEEE 802.11e DLS)
#CONFIG_PEERKEY=y

# IEEE 802.11w (management frame protection)
# This version is an experimental implementation based on IEEE 802.11w/D1.0
# draft and is subject to change since the standard has not yet been finalized.
# Driver support is also needed for IEEE 802.11w.
#CONFIG_IEEE80211W=y

# Integrated EAP server
CONFIG_EAP=y

# EAP-MD5 for the integrated EAP server
#CONFIG_EAP_MD5=y

# EAP-TLS for the integrated EAP server
#CONFIG_EAP_TLS=y

# EAP-MSCHAPv2 for the integrated EAP server
#CONFIG_EAP_MSCHAPV2=y

# EAP-PEAP for the integrated EAP server
#CONFIG_EAP_PEAP=y

# EAP-GTC for the integrated EAP server
#CONFIG_EAP_GTC=y

# EAP-TTLS for the integrated EAP server
#CONFIG_EAP_TTLS=y

# EAP-SIM for the integrated EAP server
#CONFIG_EAP_SIM=y

# EAP-AKA for the integrated EAP server
#CONFIG_EAP_AKA=y

# EAP-AKA' for the integrated EAP server
# This requires CONFIG_EAP_AKA to be enabled, too.
#CONFIG_EAP_AKA_PRIME=y

# EAP-PAX for the integrated EAP server
#CONFIG_EAP_PAX=y

# EAP-PSK for the integrated EAP server (this is _not_ needed for WPA-PSK)
#CONFIG_EAP_PSK=y

# EAP-SAKE for the integrated EAP server
#CONFIG_EAP_SAKE=y

# EAP-GPSK for the integrated EAP server
#CONFIG_EAP_SAKE=y

# EAP-GPSK for the integrated EAP server
#CONFIG_EAP_GPSK=y
# Include support for optional SHA256 cipher suite in EAP-GPSK
#CONFIG_EAP_GPSK_SHA256=y

# EAP-FAST for the integrated EAP server
# Note: Default OpenSSL package does not include support for all the
# functionality needed for EAP-FAST. If EAP-FAST is enabled with OpenSSL,
# the OpenSSL library must be patched (openssl-0.9.9-session-ticket.patch)
# to add the needed functions.
#CONFIG_EAP_FAST=y

# Wi-Fi Protected Setup (WPS)
CONFIG_WPS=y
# Enable WSC 2.0 support
CONFIG_WPS2=y
# Enable UPnP support for external WPS Registrars
#CONFIG_WPS_UPNP=y

CONFIG_TLS=internal
CONFIG_INTERNAL_LIBTOMMATH=y

# EAP-IKEv2
#CONFIG_EAP_IKEV2=y

# Trusted Network Connect (EAP-TNC)
#CONFIG_EAP_TNC=y

# PKCS#12 (PFX) support (used to read private key and certificate file from
# a file that usually has extension .p12 or .pfx)
#CONFIG_PKCS12=y

# RADIUS authentication server. This provides access to the integrated EAP
# server from external hosts using RADIUS.
#CONFIG_RADIUS_SERVER=y
# Build IPv6 support for RADIUS operations
#CONFIG_IPV6=y

# IEEE Std 802.11r-2008 (Fast BSS Transition)
#CONFIG_IEEE80211R=y

# Use the hostapd's IEEE 802.11 authentication (ACL), but without
# the IEEE 802.11 Management capability (e.g., madwifi or FreeBSD/net80211)
#CONFIG_DRIVER_RADIUS_ACL=y

# IEEE 802.11n (High Throughput) support
CONFIG_IEEE80211N=y

# Remove debugging code that is printing out debug messages to stdout.
# This can be used to reduce the size of the hostapd considerably if debugging
# code is not needed.
#CONFIG_NO_STDOUT_DEBUG=y

# Add support for writing debug log to a file: -f /tmp/hostapd.log
# Disabled by default.
#CONFIG_DEBUG_FILE=y

# Remove support for RADIUS accounting
#CONFIG_NO_ACCOUNTING=y

# Remove support for RADIUS
#CONFIG_NO_RADIUS=y

# Remove support for VLANs
#CONFIG_NO_VLAN=y

# Enable support for fully dynamic VLANs. This enables hostapd to
# automatically create bridge and VLAN interfaces if necessary.
#CONFIG_FULL_DYNAMIC_VLAN=y

# Remove support for dumping state into a file on SIGUSR1 signal
# This can be used to reduce binary size at the cost of disabling a debugging
# option.
#CONFIG_NO_DUMP_STATE=y

# Enable tracing code for developer debugging
# This tracks use of memory allocations and other registrations and reports
# incorrect use with a backtrace of call (or allocation) location.
#CONFIG_WPA_TRACE=y
# For BSD, comment out these.
#LIBS += -lexecinfo
#LIBS_p += -lexecinfo
#LIBS_c += -lexecinfo

# Use libbfd to get more details for developer debugging
# This enables use of libbfd to get more detailed symbols for the backtraces
# generated by CONFIG_WPA_TRACE=y.
#CONFIG_WPA_TRACE_BFD=y
# For BSD, comment out these.
#LIBS += -lbfd -liberty -lz
#LIBS_p += -lbfd -liberty -lz
#LIBS_c += -lbfd -liberty -lz

# hostapd depends on strong random number generation being available from the
# operating system. os_get_random() function is used to fetch random data when
# needed, e.g., for key generation. On Linux and BSD systems, this works by
# reading /dev/urandom. It should be noted that the OS entropy pool needs to be
# properly initialized before hostapd is started. This is important especially
# on embedded devices that do not have a hardware random number generator and
# may by default start up with minimal entropy available for random number
# generation.
#
# As a safety net, hostapd is by default trying to internally collect
# additional entropy for generating random data to mix in with the data
# fetched from the OS. This by itself is not considered to be very strong, but
# it may help in cases where the system pool is not initialized properly.
# However, it is very strongly recommended that the system pool is initialized
# with enough entropy either by using hardware assisted random number
# generatior or by storing state over device reboots.
#
# If the os_get_random() is known to provide strong ramdom data (e.g., on
# Linux/BSD, the board in question is known to have reliable source of random
# data from /dev/urandom), the internal hostapd random pool can be disabled.
# This will save some in binary size and CPU use. However, this should only be
# considered for builds that are known to be used on devices that meet the
# requirements described above.
#CONFIG_NO_RANDOM_POOL=y
```

Next `cd` to the folder where `defconfig` is located and copy `defconfig` to `.config`. You can now run `make` to compile `hostapd` (which also takes a very long time). 

After compiling run `sudo make install` to install the `hostapd` binaries to `/usr/local/bin`. 

### Configuring `hostapd`

`hostapd` is quite easy to configure. I saved the following configuration file under the directory where the rtl8188eu driver was downloaded:

```
interface=wlan0
driver=rtl871xdrv
ssid=RASPI_AP
hw_mode=g
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
device_name=RTL8188EU
manufacturer=Realtek
model_name=RTW_SOFTAP
model_number=WLAN_CU
serial_number=12345

#Important: Device type must start with a 6 in order to be recognized by Android smartphones since they do not support ad-hoc Wi-Fi networking
device_type=6-0050F204-1 

os_version=01020300

config_methods=label display push_button keypad
wpa=2

#Important: Put your passphrase here
wpa_passphrase=123456789

wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
macaddr_acl=0
```

### Installing `udhcpd`

I installed `udhcpd` because I needed to assign IP addresses to the devices connecting to the Raspberry Pi's network. Other DHCP servers should work, but `udhcpd` should be one of the easiest to set up. Install it with `sudo apt-get install udhcpd`. Edit `/etc/udhcpd.conf` as shown:

```
# Sample udhcpd configuration file (/etc/udhcpd.conf)

# The start and end of the IP lease block

start           192.168.0.10    #default: 192.168.0.20
end             192.168.0.254   #default: 192.168.0.254


# The interface that udhcpd will use

interface       wlan0           #default: eth0


# The maximim number of leases (includes addressesd reserved
# by OFFER's, DECLINE's, and ARP conficts

max_leases      254             #default: 254


# If remaining is true (default), udhcpd will store the time
# remaining for each lease in the udhcpd leases file. This is
# for embedded systems that cannot keep time between reboots.
# If you set remaining to no, the absolute time that the lease
# expires at will be stored in the dhcpd.leases file.

#remaining      yes             #default: yes


# The time period at which udhcpd will write out a dhcpd.leases
# file. If this is 0, udhcpd will never automatically write a
# lease file. (specified in seconds)

#auto_time      7200            #default: 7200 (2 hours)


# The amount of time that an IP will be reserved (leased) for if a
# DHCP decline message is received (seconds).

#decline_time   3600            #default: 3600 (1 hour)


# The amount of time that an IP will be reserved (leased) for if an
# ARP conflct occurs. (seconds

#conflict_time  3600            #default: 3600 (1 hour)
# How long an offered address is reserved (leased) in seconds

#offer_time     60              #default: 60 (1 minute)

# If a lease to be given is below this value, the full lease time is
# instead used (seconds).

#min_lease      60              #defult: 60


# The location of the leases file

lease_file      /var/lib/misc/udhcpd.leases     #defualt: /var/lib/misc/udhcpd.leases

# The location of the pid file
pidfile /var/run/udhcpd.pid     #default: /var/run/udhcpd.pid

# Everytime udhcpd writes a leases file, the below script will be called.
# Useful for writing the lease file to flash every few hours.

#notify_file                            #default: (no script)

notify_file     dumpleases      # <--- useful for debugging

# The following are bootp specific options, setable by udhcpd.

#siaddr         192.168.0.22            #default: 0.0.0.0

#sname          zorak                   #default: (none)

#boot_file      /var/nfs_root           #default: (none)

# The remainer of options are DHCP options and can be specifed with the
# keyword 'opt' or 'option'. If an option can take multiple items, such
# as the dns option, they can be listed on the same line, or multiple
# lines. The only option with a default is 'lease'.

#Examples
opt     dns     192.168.0.1
option  subnet  255.255.255.0
opt     router  192.168.0.1
option  domain  local
option  lease   864000          # 10 days of seconds


# Currently supported options, for more info, see options.c
#opt subnet
#opt timezone
#opt router
#opt timesrv
#opt namesrv
#opt dns
#opt logsrv
#opt cookiesrv
#opt lprsrv
#opt bootsize
#opt domain
#opt swapsrv
#opt rootpath
#opt ipttl
#opt mtu
#opt broadcast
#opt wins
#opt lease
#opt ntpsrv
#opt tftp
#opt bootfile
#opt wpad

# Static leases map
#static_lease 00:60:08:11:CE:4E 192.168.0.54
#static_lease 00:60:08:11:CE:3E 192.168.0.44
```

###Running `hostapd` and `udhcpd` on startup
You can't have this Wi-Fi adapter act as both an access point and connect to a Wi-Fi network at the same time. Edit `/etc/network/interfaces` to set up the TP-LINK as an access point with a fixed IP address.

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

#allow-hotplug wlan0
#iface wlan0 inet manual
#wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
#iface default inet dhcp

iface wlan0 inet static
        address 192.168.0.1
        netmask 255.255.255.0
```

Note that the IP address I used is the same as the one I used in `/etc/udhcpd.conf`. Next edit `/etc/default/udhcpd` and comment out the first line to run `udhcpd` on startup. 

Running `hostapd` on startup is slightly more complicated. Since I did not install Debian's `hostapd` package which came with an init script, I had to write my own in `/etc/init.d/hostapd`. This is what I used:

```
#!/bin/sh

### BEGIN INIT INFO
# Provides:             hostapd
# Required-Start:       $remote_fs
# Required-Stop:        $remote_fs
# Should-Start:         $network
# Should-Stop:
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Advanced IEEE 802.11 management daemon
# Description:          Userspace IEEE 802.11 AP and IEEE 802.1X/WPA/WPA2/EAP
#                       Authenticator
### END INIT INFO

PATH=/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON_SBIN=/usr/local/bin/hostapd
DAEMON_CONF=/home/pi/rtl8188eu/hostapd.conf
NAME=hostapd
DESC="advanced IEEE 802.11 management"
PIDFILE=/var/run/hostapd.pid

DAEMON_OPTS="-B -P $PIDFILE $DAEMON_OPTS $DAEMON_CONF"

. /lib/lsb/init-functions

case "$1" in
  start)
        log_daemon_msg "Starting $DESC" "$NAME"
        start-stop-daemon --start --oknodo --quiet --exec "$DAEMON_SBIN" \
                --pidfile "$PIDFILE" -- $DAEMON_OPTS >/dev/null
        log_end_msg "$?"
        ;;
  stop)
        log_daemon_msg "Stopping $DESC" "$NAME"
        start-stop-daemon --stop --oknodo --quiet --exec "$DAEMON_SBIN" \
                --pidfile "$PIDFILE"
        log_end_msg "$?"
        ;;
  reload)
        log_daemon_msg "Reloading $DESC" "$NAME"
        start-stop-daemon --stop --signal HUP --exec "$DAEMON_SBIN" \
                --pidfile "$PIDFILE"
        log_end_msg "$?"
        ;;
  restart|force-reload)
        $0 stop
        sleep 8
        $0 start
        ;;
  status)
        status_of_proc "$DAEMON_SBIN" "$NAME"
        exit $?
        ;;
  *)
        N=/etc/init.d/$NAME
        echo "Usage: $N {start|stop|restart|force-reload|reload|status}" >&2
        exit 1
        ;;
esac

exit 0
```

Run `update-rc.d hostapd defaults` to enable this init script. Reboot to test the configuration. The IP address of the Pi should be `192.168.0.1`. Connect your computer to `RASPI_AP` and SSH in to the Pi's IP address to login.

# Conclusion

This is a case where open-source vendor provided drivers would be really helpful. However, the TP-LINK WN725N v2 does work fairly reliably (though there are a few random, seemingly non-critical errors in `dmesg`). One could possibly set up NAT to have the Raspberry Pi act as a router and connect its clients to the Internet, but this would require an Ethernet connection or two Wi-Fi adapters. 
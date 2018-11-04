//! GeoIP executor actor
use super::actix::prelude::*;
use super::actix_web::*;
use super::futures::future;
use super::futures::Future;
use super::serde_json;
use std::io;

/// This is GeoIP executor actor. We are going to run 3 of them in parallel.
pub struct GeoIPExecutor {
    api_key: String,
}

impl GeoIPExecutor {
    pub fn new(api_key: String) -> Self {
        return Self { api_key: api_key };
    }
}

/// This is only message that this actor can handle, but it is easy to extend
/// number of messages.
pub struct LookupIP {
    pub address: String,
}

pub struct IPLocation {
    pub location: (f64, f64),
}

impl Message for LookupIP {
    type Result = Result<IPLocation, io::Error>;
}

impl Actor for GeoIPExecutor {
    type Context = Context<Self>;
}

impl Handler<LookupIP> for GeoIPExecutor {
    type Result = ResponseFuture<IPLocation, io::Error>;

    fn handle(&mut self, msg: LookupIP, _: &mut Self::Context) -> Self::Result {
        println!("From IP {}", msg.address);
        let result = client::get(format!(
            "http://api.ipstack.com/{}?access_key={}",
            msg.address, self.api_key
        ))
        .finish()
        .unwrap();
        let ft = result
            .send()
            .map_err(|_| io::Error::new(io::ErrorKind::Other, "geoip error"))
            .and_then(|response| {
                response
                    .json()
                    .map_err(|_| io::Error::new(io::ErrorKind::Other, "json error"))
            })
            .and_then(move |response: serde_json::Value| {
                let latitude = response["latitude"].as_f64();
                let longitude = response["longitude"].as_f64();
                match (latitude, longitude) {
                    (Some(latitude), Some(longitude)) => future::ok(IPLocation {
                        location: (latitude, longitude),
                    }),
                    _ => future::err(io::Error::new(io::ErrorKind::Other, "json parse error")),
                }
            });
        Box::new(ft)
    }
}

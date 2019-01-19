extern crate actix;
extern crate actix_web;
extern crate env_logger;
#[macro_use]
extern crate rust_embed;
extern crate futures;
extern crate json;
extern crate mime_guess;
extern crate r2d2;
extern crate r2d2_sqlite;
extern crate rusqlite;
extern crate serde;
extern crate serde_derive;
extern crate serde_json;
extern crate time;

use self::actix::prelude::*;
use actix_web::http::{header, Method};
use actix_web::{server, App, Body, HttpRequest, HttpResponse};
use futures::future::Future;
use mime_guess::guess_mime_type;
use r2d2_sqlite::SqliteConnectionManager;
use std::sync::Arc;
use std::path::Path;

mod api;
mod db;
mod geoip;
use self::db::{DbExecutor, LogVisit};
use self::geoip::{GeoIPExecutor, LookupIP};

#[derive(RustEmbed)]
#[folder = "frontend/out/"]
struct Asset;

fn handle_embedded_file(path: &str) -> HttpResponse {
    let (mime_type, content) = match Asset::get(path) {
        Some(content) => (guess_mime_type(path), Some(content)),
        None => {
            let path = Path::new(path).join("index.html");
            (guess_mime_type(&path), Asset::get(&path.to_string_lossy()))
        }
    };

    match content {
        Some(content) => HttpResponse::Ok()
            .header(
                header::CONTENT_TYPE,
                mime_type.as_ref(),
            )
            .header(header::CACHE_CONTROL, "7200")
            .body(Body::from_slice(content.as_ref())),
        None => HttpResponse::NotFound().body("404 Not Found"),
    }
}

struct State {
    db: Addr<DbExecutor>,
    geoip: Addr<GeoIPExecutor>,
}

fn handle_static(req: HttpRequest<Arc<State>>) -> HttpResponse {
    handle_embedded_file(&req.path()[1..])
}

fn handle_resume(req: HttpRequest<Arc<State>>) -> HttpResponse {
    use std::net::{AddrParseError, IpAddr, SocketAddr};

    let timestamp = time::now().to_timespec();
    let state = req.state().clone();
    match req.connection_info().remote() {
        Some(remote_host) => {
            let ip: Option<IpAddr> = {
                let socket_remote: Result<SocketAddr, AddrParseError> = remote_host.parse();
                let ipaddr_remote: Result<IpAddr, AddrParseError> = remote_host.parse();
                match socket_remote {
                    Ok(socket_remote) => { Some(socket_remote.ip()) }
                    _ => ipaddr_remote.ok()
                }
            };

            match ip {
                Some(ip) => {
                    let ip: String = ip.to_string();
                    let ft = state
                        .geoip
                        .send(LookupIP {
                            address: ip.clone(),
                        })
                        .and_then(move |res| {
                            let msg = match res {
                                Ok(ref location) => LogVisit {
                                    ipaddr: ip,
                                    time: timestamp,
                                    location: location.location,
                                },

                                Err(_) => LogVisit {
                                    ipaddr: ip,
                                    time: timestamp,
                                    location: (0.0, 0.0),
                                },
                            };
                            state.db.send(msg)
                        })
                        .map(|_| ())
                        .map_err(|_| ());
                    req.server_settings().cpu_pool().spawn(ft).forget();
                }
                _ => { println!("Failed to parse {}", remote_host); }
            };
        }
        _ => {
            println!("no remote");
        }
    };

    handle_embedded_file("static/resume.pdf")
}

fn main() {
    ::std::env::set_var("RUST_LOG", "actix_web=debug");

    let geoip_api_key = api::GEOIP_KEY.to_string();

    let sys = actix::System::new("website");
    let manager = SqliteConnectionManager::file("resume-logs.sqlite");
    let pool = r2d2::Pool::new(manager).unwrap();
    let db_addr = SyncArbiter::start(1, move || DbExecutor::new(pool.clone()));
    let geoip_addr = Arbiter::start(|_| GeoIPExecutor::new(geoip_api_key));

    server::new(move || {
        App::with_state(Arc::new(State {
            db: db_addr.clone(),
            geoip: geoip_addr.clone(),
        }))
        .route("/resume.pdf", Method::GET, handle_resume)
        .route("/{_:.*}", Method::GET, handle_static)
    })
    .bind("0.0.0.0:8000")
    .unwrap()
    .run();

    let _ = sys.run();
}

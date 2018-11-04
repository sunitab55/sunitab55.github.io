//! Db executor actor
use super::actix::prelude::*;
use super::actix_web::*;
use super::r2d2::Pool;
use super::r2d2_sqlite::SqliteConnectionManager;
use super::rusqlite::types::ToSql;
use super::rusqlite::NO_PARAMS;
use super::time::Timespec;
use std::io;

/// This is db executor actor. We are going to run 3 of them in parallel.
pub struct DbExecutor {
    pool: Pool<SqliteConnectionManager>,
}

impl DbExecutor {
    pub fn new(pool: Pool<SqliteConnectionManager>) -> Self {
        let conn = pool.get().unwrap();
        conn.execute(
            "CREATE TABLE IF NOT EXISTS Access (
                  date DATE NOT NULL,
                  ipaddr TEXT NOT NULL,
                  latitude REAL NOT NULL,
                  longitude REAL NOT NULL
                  )",
            NO_PARAMS,
        )
        .unwrap();

        return Self { pool: pool };
    }
}

/// This is only message that this actor can handle, but it is easy to extend
/// number of messages.
pub struct LogVisit {
    pub ipaddr: String,
    pub time: Timespec,
    pub location: (f64, f64),
}

impl Message for LogVisit {
    type Result = Result<(), io::Error>;
}

impl Actor for DbExecutor {
    type Context = SyncContext<Self>;
}

impl Handler<LogVisit> for DbExecutor {
    type Result = Result<(), io::Error>;

    fn handle(&mut self, msg: LogVisit, _: &mut Self::Context) -> Self::Result {
        let conn = self.pool.get().unwrap();

        conn.execute(
            "INSERT INTO Access (date, ipaddr, latitude, longitude) VALUES ($1, $2, $3, $4)",
            &[
                &msg.time,
                &msg.ipaddr as &ToSql,
                &msg.location.0 as &ToSql,
                &msg.location.1 as &ToSql,
            ],
        )
        .map_err(|e| {
            println!("error: {:?}", e);
            io::Error::new(io::ErrorKind::Other, "db error")
        })
        .map(|_| ())
    }
}

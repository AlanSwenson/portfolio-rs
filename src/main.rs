#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use chrono::{Datelike, Utc};
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/")]
fn index() -> Template {
    let now = Utc::now();
    let (_is_common_era, year) = now.year_ce();
    let borrowed_year = year.to_string();
    let context: HashMap<&str, &str> = [("name", "Alan Swenson"), ("year", &borrowed_year)]
        .iter()
        .cloned()
        .collect();
    Template::render("main", &context)
}

fn main() {
    rocket::ignite()
        .mount("/static", StaticFiles::from("static"))
        .mount("/", routes![index])
        .attach(Template::fairing())
        .launch();
}

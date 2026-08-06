---
title: "BCV Exchange Rate Scraper & API"
icon: "currency_exchange"
order: 1
tags:
  - { name: "Go", color: "tertiary" }
  - { name: "Colly v2", color: "secondary" }
  - { name: "Docker", color: "primary-fixed-dim" }
stats:
  - { label: "Scheduled", value: "2x daily", color: "tertiary", width: "100%" }
  - { label: "Dual Currency", value: "USD + EUR", color: "secondary" }
links:
  - { label: "GitHub", icon: "code", href: "https://github.com/jssmntll/bcv-scrapper" }
featured: true
---

A Go service that scrapes official exchange rates from the Central Bank of Venezuela (BCV) and exposes them via a clean RESTful API. Features automated cron scheduling (9 AM & 4 PM), concurrent-safe atomic snapshots with sync.RWMutex, Spanish-to-ISO 8601 date normalization, string-to-float64 parsing, and a custom TLS transport for resilient scraping.

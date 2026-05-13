---
title: Kiwistack
description: The App that connects New Zealand Software companies to New Zealand businesses and the world.
date: 11/05/2026
id: KiwiStack
img: https://www.kiwistack.co.nz/logo.svg
tags: "WebDev NZ"
...

# Kiwistack


Every Friday afternoon at Lumin, we have company drinks. It is a time to unwind, relax and socialize with the awesome people who work at here at Lumin after a long week of work. I got chatting to our excellent COO [Caleb](https://www.linkedin.com/in/calebhelm/) about [KiwiSaas](https://www.kiwisaas.com), an organization devoted to *"accelerate the growth of New Zealand’s SaaS sector by developing people, growing companies, and connecting the ecosystem"*, where he sits on the board. We got talking about how many amazing software companies there are in New Zealand, and how sad it is that kiwi businesses often go with overseas companies through lack of awareness of the amazing software companies we have here in New Zealand. This is the thought that started kiwiStack. 

I suggested to Caleb that it would be great to have a website that a business could input the global software they use or want to use and show viable New Zealand alternatives. This would be a great way to connect New Zealand software companies to New Zealand businesses, and also to the world. Caleb loved the idea, and through a weekend  of work, I built the first version of KiwiStack, which you can check out at [kiwistack.co.nz](https://www.kiwistack.co.nz) or below.

@[KiwiStack](https://www.kiwistack.co.nz) *Kiwistack Website*


The site is built using nextjs, tailwind css and typescript, and is hosted on vercel. The data is stored on supabase, and the search is powered by open AI's chat GPT and firecrawl. A user searches a new website, it scrapes the site using firecrawl, and then uses chat GPT to match to a curated database of NZ software companies. This search is then cached in supabase for future use.
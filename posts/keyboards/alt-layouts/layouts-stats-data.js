// Copyright 2026 Google LLC.
// SPDX-License-Identifier: Apache-2.0
//
// Data for layout comparison tables.

const METRIC_DEFS = {
  "sfb": {
    "label": "SFBs",
    "title": "Same-Finger Bigrams (SFBs)",
    "better": "lower",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#same-finger-bigram-sfb"
  },
  "sfs": {
    "label": "SFSs",
    "title": "Same-Finger Skipgrams (SFSs)",
    "better": "lower",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#same-finger-skipgram-sfs"
  },
  "lsb": {
    "label": "LSBs",
    "title": "Lateral Stretch Bigrams (LSBs)",
    "better": "lower",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#lateral-stretch-bigram-lsb"
  },
  "scissor": {
    "label": "Scissor",
    "title": "Scissors",
    "better": "lower",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#scissor"
  },
  "alternation": {
    "label": "Alt",
    "title": "Hand Alternation",
    "better": "neutral",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#hand-alternation"
  },
  "roll_in": {
    "label": "In-Rolls",
    "title": "In-Rolls",
    "better": "higher",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#roll"
  },
  "roll_out": {
    "label": "Out-Rolls",
    "title": "Out-Rolls",
    "better": "neutral",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#roll"
  },
  "rolls": {
    "label": "Rolls",
    "title": "Total Rolls (in + out)",
    "better": "higher",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#roll"
  },
  "redir": {
    "label": "Redir",
    "title": "Redirects",
    "better": "lower",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#redirect"
  },
  "pinky_scissor": {
    "label": "Pinky Scis",
    "title": "Pinky/Ring Scissors",
    "better": "lower",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#scissor"
  },
  "pinky_off": {
    "label": "Pinky off",
    "title": "Off-Home Pinky Use",
    "better": "lower",
    "defaultShort": false,
    "defaultStats": false,
    "glossary": "../glossary/index.html#finger-usage"
  },
  "pinky_usage": {
    "label": "Pinky",
    "title": "Total Pinky Use",
    "better": "lower",
    "defaultShort": true,
    "defaultStats": true,
    "glossary": "../glossary/index.html#finger-usage"
  }
};

const METRIC_LIMITS = {
  "sfb": [
    0.6,
    1.05
  ],
  "sfs": [
    2.55,
    4.0
  ],
  "lsb": [
    0.39,
    1.85
  ],
  "scissor": [
    0.14,
    0.98
  ],
  "rolls": [
    41.0,
    50.0
  ],
  "roll_in": [
    21.0,
    33.0
  ],
  "roll_out": [
    12.0,
    27.0
  ],
  "redir": [
    2.0,
    5.6
  ],
  "pinky_off": [
    0.9,
    4.6
  ],
  "pinky_usage": [
    14.5,
    18.5
  ],
  "pinky_scissor": [
    0.2,
    1.35
  ],
  "alternation": [
    10.0,
    18.5
  ]
};

const LAYOUTS_DATA = [
  {
    "name": "QWERTY",
    "year": "1873",
    "url": "https://en.wikipedia.org/wiki/QWERTY",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 4.3846,
      "sfs": 5.4547,
      "lsb": 4.5461,
      "scissor": 1.4636,
      "rolls": 40.7562,
      "roll_in": 21.6989,
      "roll_out": 19.0573,
      "redir": 6.2232,
      "pinky_off": 2.4749,
      "pinky_usage": 11.0397,
      "pinky_scissor": 0.5589,
      "alternation": 10.5307
    }
  },
  {
    "name": "Dvorak",
    "year": "1936",
    "url": "https://en.wikipedia.org/wiki/Dvorak_keyboard_layout",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 1.8664,
      "sfs": 3.4805,
      "lsb": 0.7996,
      "scissor": 0.0767,
      "rolls": 39.2044,
      "roll_in": 23.7898,
      "roll_out": 15.4146,
      "redir": 1.5534,
      "pinky_off": 4.127,
      "pinky_usage": 19.3245,
      "pinky_scissor": 0.4,
      "alternation": 19.2495
    }
  },
  {
    "name": "Maltron",
    "year": "1977",
    "url": "https://en.wikipedia.org/wiki/Maltron#Layouts",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.657,
      "sfs": 2.743,
      "lsb": 0.6965,
      "scissor": 0.1103,
      "rolls": 50.8937,
      "roll_in": 24.7753,
      "roll_out": 26.1183,
      "redir": 6.621,
      "pinky_off": 4.8611,
      "pinky_usage": 19.8781,
      "pinky_scissor": 0.9847,
      "alternation": 12.5831
    }
  },
  {
    "name": "Arensito",
    "year": "2001",
    "url": "http://www.pvv.org/~hakonhal/main.cgi/keyboard",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.957,
      "sfs": 3.7237,
      "lsb": 1.2152,
      "scissor": 0.4534,
      "rolls": 54.546,
      "roll_in": 25.0425,
      "roll_out": 29.5035,
      "redir": 5.2752,
      "pinky_off": 1.4821,
      "pinky_usage": 17.4226,
      "pinky_scissor": 2.1803,
      "alternation": 9.8876
    }
  },
  {
    "name": "Capewell",
    "year": "2005",
    "url": "http://www.michaelcapewell.com/projects/keyboard/index.htm",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 1.1855,
      "sfs": 3.3369,
      "lsb": 0.6235,
      "scissor": 0.1864,
      "rolls": 51.4341,
      "roll_in": 26.1054,
      "roll_out": 25.3287,
      "redir": 7.8915,
      "pinky_off": 1.6366,
      "pinky_usage": 17.609,
      "pinky_scissor": 1.3427,
      "alternation": 9.4818
    }
  },
  {
    "name": "Colemak",
    "year": "2006",
    "url": "https://colemak.com/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.9096,
      "sfs": 4.2425,
      "lsb": 2.2602,
      "scissor": 0.2594,
      "rolls": 49.196,
      "roll_in": 26.6712,
      "roll_out": 22.5248,
      "redir": 5.3305,
      "pinky_off": 0.7845,
      "pinky_usage": 16.5809,
      "pinky_scissor": 0.6476,
      "alternation": 12.5246
    }
  },
  {
    "name": "Workman",
    "year": "2010",
    "url": "https://workmanlayout.org/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 1.9674,
      "sfs": 4.1533,
      "lsb": 1.1115,
      "scissor": 0.4726,
      "rolls": 47.3983,
      "roll_in": 25.7476,
      "roll_out": 21.6507,
      "redir": 6.0505,
      "pinky_off": 0.7845,
      "pinky_usage": 16.0609,
      "pinky_scissor": 0.5728,
      "alternation": 12.1084
    }
  },
  {
    "name": "MTGAP",
    "year": "2010",
    "url": "https://mathematicalmulticore.wordpress.com/the-keyboard-layout-project/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.9183,
      "sfs": 3.2657,
      "lsb": 0.4586,
      "scissor": 0.1501,
      "rolls": 46.3364,
      "roll_in": 29.9968,
      "roll_out": 16.3396,
      "redir": 1.7823,
      "pinky_off": 3.8041,
      "pinky_usage": 17.7801,
      "pinky_scissor": 0.587,
      "alternation": 16.677
    }
  },
  {
    "name": "Colemak-DH",
    "year": "2014",
    "url": "https://colemakmods.github.io/mod-dh/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.9096,
      "sfs": 4.2425,
      "lsb": 1.2707,
      "scissor": 0.1511,
      "rolls": 49.196,
      "roll_in": 26.6712,
      "roll_out": 22.5248,
      "redir": 5.3305,
      "pinky_off": 0.7845,
      "pinky_usage": 16.5809,
      "pinky_scissor": 0.6476,
      "alternation": 12.5246
    }
  },
  {
    "name": "Hieamtsrn",
    "year": "2014",
    "url": "https://mathematicalmulticore.wordpress.com/the-keyboard-layout-project/#comment-4976",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.7937,
      "sfs": 3.558,
      "lsb": 0.5621,
      "scissor": 0.1112,
      "rolls": 44.6327,
      "roll_in": 35.5074,
      "roll_out": 9.1253,
      "redir": 1.4941,
      "pinky_off": 4.184,
      "pinky_usage": 16.4253,
      "pinky_scissor": 0.5313,
      "alternation": 18.1802
    }
  },
  {
    "name": "Halmak",
    "year": "2016",
    "url": "https://github.com/MadRabbit/halmak",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 1.9678,
      "sfs": 3.4708,
      "lsb": 0.4018,
      "scissor": 0.5556,
      "rolls": 40.1096,
      "roll_in": 21.5099,
      "roll_out": 18.5997,
      "redir": 2.5207,
      "pinky_off": 5.478,
      "pinky_usage": 20.1304,
      "pinky_scissor": 1.5643,
      "alternation": 18.7248
    }
  },
  {
    "name": "RSTHD",
    "year": "2016",
    "url": "https://xsznix.wordpress.com/2016/05/16/introducing-the-rsthd-layout/",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.6955,
      "sfs": 2.9368,
      "lsb": 0.8137,
      "scissor": 0.0858,
      "rolls": 53.1985,
      "roll_in": 37.4136,
      "roll_out": 15.785,
      "redir": 6.4041,
      "pinky_off": 0.7896,
      "pinky_usage": 14.6624,
      "pinky_scissor": 0.9942,
      "alternation": 10.1445
    }
  },
  {
    "name": "BEAKL19bis",
    "year": "2020",
    "url": "https://cyanophage.github.io/playground.html?layout=qyouzwdnck-hiea%2Cgtrsp%3Bj%27%2F.xvmlfb%5C%5E&mode=ergo&lan=english",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.9455,
      "sfs": 4.0726,
      "lsb": 1.5225,
      "scissor": 0.3886,
      "rolls": 43.7394,
      "roll_in": 32.6321,
      "roll_out": 11.1073,
      "redir": 1.499,
      "pinky_off": 2.2612,
      "pinky_usage": 9.3654,
      "pinky_scissor": 0.1853,
      "alternation": 17.9174
    }
  },
  {
    "name": "Handsdown Neu",
    "year": "2021",
    "url": "https://sites.google.com/alanreiser.com/handsdown",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.7647,
      "sfs": 3.9948,
      "lsb": 1.2618,
      "scissor": 0.4196,
      "rolls": 44.0422,
      "roll_in": 33.3409,
      "roll_out": 10.7013,
      "redir": 1.475,
      "pinky_off": 2.8915,
      "pinky_usage": 14.0471,
      "pinky_scissor": 0.5869,
      "alternation": 18.1021
    }
  },
  {
    "name": "Boo",
    "year": "2021",
    "url": "https://ballerboo.github.io/boolayout/",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.7845,
      "sfs": 3.0249,
      "lsb": 1.5757,
      "scissor": 0.0817,
      "rolls": 50.4073,
      "roll_in": 24.1609,
      "roll_out": 26.2464,
      "redir": 5.397,
      "pinky_off": 2.765,
      "pinky_usage": 18.4503,
      "pinky_scissor": 1.1053,
      "alternation": 13.2706
    }
  },
  {
    "name": "Colemak Qi;x",
    "year": "2021",
    "url": "https://github.com/DreymaR/BigBagKbdTrixPKL/tree/master/Layouts/Colemak/Cmk-Qmods#colemak-qix-by-nyfee-2021-03",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.7359,
      "sfs": 3.3122,
      "lsb": 1.5001,
      "scissor": 0.1574,
      "rolls": 48.4699,
      "roll_in": 26.481,
      "roll_out": 21.9889,
      "redir": 4.8874,
      "pinky_off": 1.5343,
      "pinky_usage": 17.4855,
      "pinky_scissor": 1.4299,
      "alternation": 14.2156
    }
  },
  {
    "name": "Engram",
    "year": "2021",
    "url": "https://engram.dev/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 1.0119,
      "sfs": 3.4658,
      "lsb": 0.4097,
      "scissor": 0.3634,
      "rolls": 44.3161,
      "roll_in": 29.9448,
      "roll_out": 14.3713,
      "redir": 2.2666,
      "pinky_off": 5.705,
      "pinky_usage": 16.8595,
      "pinky_scissor": 0.7114,
      "alternation": 17.4933
    }
  },
  {
    "name": "ISRT",
    "year": "2021",
    "url": "https://cyanophage.github.io/playground.html?layout=yclmkzfu%2C%27-isrtgpneao%3Bqvwdjbh%2F.x%5C%5E&mode=ergo&lan=english",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.6509,
      "sfs": 3.4954,
      "lsb": 1.5143,
      "scissor": 0.2753,
      "rolls": 50.6977,
      "roll_in": 23.4445,
      "roll_out": 27.2532,
      "redir": 5.1639,
      "pinky_off": 2.4103,
      "pinky_usage": 17.7185,
      "pinky_scissor": 1.106,
      "alternation": 13.1197
    }
  },
  {
    "name": "Semimak",
    "year": "2021",
    "url": "https://semilin.github.io/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.5901,
      "sfs": 2.7625,
      "lsb": 1.6514,
      "scissor": 0.3923,
      "rolls": 44.6973,
      "roll_in": 21.3106,
      "roll_out": 23.3866,
      "redir": 4.4785,
      "pinky_off": 3.762,
      "pinky_usage": 18.0602,
      "pinky_scissor": 1.1689,
      "alternation": 17.7957
    }
  },
  {
    "name": "APTv3",
    "year": "2021",
    "url": "https://github.com/Apsu/APT#aptv3-layout",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.8053,
      "sfs": 3.0906,
      "lsb": 0.3264,
      "scissor": 0.1077,
      "rolls": 49.5519,
      "roll_in": 34.8898,
      "roll_out": 14.6621,
      "redir": 3.601,
      "pinky_off": 3.4517,
      "pinky_usage": 17.3549,
      "pinky_scissor": 1.1221,
      "alternation": 15.1371
    }
  },
  {
    "name": "Whorf",
    "year": "2021",
    "url": "https://cyanophage.github.io/playground.html?layout=flhdmvwou%2C%2Fsrntkgyaei-xjbzqpc%27%3B.%5C%5E&mode=ergo&lan=english",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.4512,
      "sfs": 2.7336,
      "lsb": 1.6573,
      "scissor": 0.767,
      "rolls": 46.6658,
      "roll_in": 22.8929,
      "roll_out": 23.7729,
      "redir": 4.416,
      "pinky_off": 3.7381,
      "pinky_usage": 18.0313,
      "pinky_scissor": 0.6362,
      "alternation": 17.0112
    }
  },
  {
    "name": "Nerps",
    "year": "2022",
    "url": "https://www.reddit.com/r/KeyboardLayouts/comments/tpwyjc/sertain_nerts_nerps_low_redirect_low_sfb_low/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.8462,
      "sfs": 3.3556,
      "lsb": 1.242,
      "scissor": 1.1149,
      "rolls": 46.3094,
      "roll_in": 20.1279,
      "roll_out": 26.1815,
      "redir": 1.6561,
      "pinky_off": 1.3192,
      "pinky_usage": 16.425,
      "pinky_scissor": 0.2451,
      "alternation": 17.6329
    }
  },
  {
    "name": "CTGAP",
    "year": "2022",
    "url": "https://github.com/CTGAP/ctgap-keyboard-layout",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.7353,
      "sfs": 3.4214,
      "lsb": 1.0131,
      "scissor": 0.6777,
      "rolls": 45.4544,
      "roll_in": 18.9105,
      "roll_out": 26.5439,
      "redir": 2.2809,
      "pinky_off": 1.2297,
      "pinky_usage": 15.4981,
      "pinky_scissor": 0.5778,
      "alternation": 17.7615
    }
  },
  {
    "name": "Canary",
    "year": "2022",
    "url": "https://github.com/Apsu/Canary",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.6566,
      "sfs": 3.6522,
      "lsb": 1.747,
      "scissor": 0.4192,
      "rolls": 50.3623,
      "roll_in": 24.868,
      "roll_out": 25.4943,
      "redir": 3.3932,
      "pinky_off": 2.9571,
      "pinky_usage": 14.6493,
      "pinky_scissor": 0.3757,
      "alternation": 14.4146
    }
  },
  {
    "name": "Octa8",
    "year": "2022",
    "url": "https://github.com/OctahedronV2/Octa8/blob/main/README.md#octa8",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.8792,
      "sfs": 2.9891,
      "lsb": 0.6437,
      "scissor": 0.1049,
      "rolls": 48.799,
      "roll_in": 24.6621,
      "roll_out": 24.1369,
      "redir": 3.0274,
      "pinky_off": 3.4846,
      "pinky_usage": 14.4617,
      "pinky_scissor": 0.9525,
      "alternation": 15.7077
    }
  },
  {
    "name": "Seht Drai",
    "year": "2022",
    "url": "https://github.com/samuelxyz/layouts#seht-drai",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.6307,
      "sfs": 2.7375,
      "lsb": 0.8323,
      "scissor": 0.6358,
      "rolls": 57.8445,
      "roll_in": 29.3988,
      "roll_out": 28.4456,
      "redir": 5.5866,
      "pinky_off": 3.7504,
      "pinky_usage": 18.0462,
      "pinky_scissor": 1.3308,
      "alternation": 9.6491
    }
  },
  {
    "name": "Sturdy",
    "year": "2022",
    "url": "https://o-x-e-y.github.io/layouts/sturdy/index.html",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.6236,
      "sfs": 2.8029,
      "lsb": 1.5814,
      "scissor": 0.4241,
      "rolls": 50.0981,
      "roll_in": 24.3814,
      "roll_out": 25.7168,
      "redir": 2.8521,
      "pinky_off": 2.0937,
      "pinky_usage": 16.0475,
      "pinky_scissor": 0.4088,
      "alternation": 15.8404
    }
  },
  {
    "name": "Gallium",
    "year": "2023",
    "url": "https://github.com/GalileoBlues/Gallium",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.6354,
      "sfs": 2.7086,
      "lsb": 0.846,
      "scissor": 0.4177,
      "rolls": 46.07,
      "roll_in": 21.6358,
      "roll_out": 24.4342,
      "redir": 1.866,
      "pinky_off": 3.157,
      "pinky_usage": 17.8182,
      "pinky_scissor": 0.4836,
      "alternation": 18.558
    }
  },
  {
    "name": "Graphite",
    "year": "2023",
    "url": "https://github.com/rdavison/graphite-layout",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.6817,
      "sfs": 2.7257,
      "lsb": 0.8746,
      "scissor": 0.4112,
      "rolls": 46.0107,
      "roll_in": 22.1837,
      "roll_out": 23.8269,
      "redir": 1.8037,
      "pinky_off": 2.3355,
      "pinky_usage": 16.8272,
      "pinky_scissor": 0.2543,
      "alternation": 18.5493
    }
  },
  {
    "name": "Recurva",
    "year": "2023",
    "url": "https://github.com/GalileoBlues/Recurva",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.5604,
      "sfs": 2.737,
      "lsb": 1.1886,
      "scissor": 0.4379,
      "rolls": 50.1887,
      "roll_in": 24.0004,
      "roll_out": 26.1883,
      "redir": 2.7882,
      "pinky_off": 4.3986,
      "pinky_usage": 18.8282,
      "pinky_scissor": 1.0915,
      "alternation": 15.8105
    }
  },
  {
    "name": "Vibranium",
    "year": "2023",
    "url": "https://sites.google.com/alanreiser.com/handsdown/home/hands-down-neu",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.5695,
      "sfs": 3.2046,
      "lsb": 0.3565,
      "scissor": 0.4396,
      "rolls": 46.9344,
      "roll_in": 34.4645,
      "roll_out": 12.4698,
      "redir": 1.29,
      "pinky_off": 4.1135,
      "pinky_usage": 15.8513,
      "pinky_scissor": 0.7951,
      "alternation": 17.7663
    }
  },
  {
    "name": "Hanster-23",
    "year": "2024",
    "url": "https://commons.wikimedia.org/wiki/User:VTSGsRock/the_Hanster_Keyboard_Layout",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.8592,
      "sfs": 3.7628,
      "lsb": 1.9891,
      "scissor": 0.1893,
      "rolls": 43.5805,
      "roll_in": 31.6237,
      "roll_out": 11.9568,
      "redir": 1.4834,
      "pinky_off": 2.7454,
      "pinky_usage": 10.938,
      "pinky_scissor": 0.1042,
      "alternation": 18.4576
    }
  },
  {
    "name": "Vylet",
    "year": "2024",
    "url": "https://github.com/MightyAcas/vylet",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.9229,
      "sfs": 3.0772,
      "lsb": 0.7485,
      "scissor": 0.0661,
      "rolls": 49.23,
      "roll_in": 34.3792,
      "roll_out": 14.8509,
      "redir": 3.7266,
      "pinky_off": 3.4438,
      "pinky_usage": 17.3454,
      "pinky_scissor": 0.5113,
      "alternation": 15.3166
    }
  },
  {
    "name": "Focal",
    "year": "2024",
    "url": "https://github.com/Keyhabit/Focal-keyboard-layout/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.5292,
      "sfs": 3.2291,
      "lsb": 0.9942,
      "scissor": 0.4638,
      "rolls": 46.9993,
      "roll_in": 23.6278,
      "roll_out": 23.3715,
      "redir": 2.933,
      "pinky_off": 2.0937,
      "pinky_usage": 16.0475,
      "pinky_scissor": 0.4125,
      "alternation": 17.1574
    }
  },
  {
    "name": "Promethium",
    "year": "2024",
    "url": "https://www.reddit.com/r/KeyboardLayouts/comments/1g66ivi/hands_down_promethium_snth_meets_hd_silverengram/",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.5848,
      "sfs": 3.0476,
      "lsb": 0.245,
      "scissor": 0.1098,
      "rolls": 45.7456,
      "roll_in": 30.89,
      "roll_out": 14.8556,
      "redir": 1.529,
      "pinky_off": 4.0769,
      "pinky_usage": 14.4065,
      "pinky_scissor": 0.4229,
      "alternation": 18.2149
    }
  },
  {
    "name": "Caster",
    "year": "2024",
    "url": "https://www.reddit.com/r/KeyboardLayouts/comments/1g895nx/comment/lsyw81b/",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.6308,
      "sfs": 2.7138,
      "lsb": 0.0541,
      "scissor": 0.5439,
      "rolls": 50.8689,
      "roll_in": 31.101,
      "roll_out": 19.7679,
      "redir": 5.6458,
      "pinky_off": 3.4011,
      "pinky_usage": 11.7284,
      "pinky_scissor": 0.3524,
      "alternation": 12.6285
    }
  },
  {
    "name": "Nordrassil",
    "year": "2024",
    "url": "https://github.com/empressabyss/nordrassil",
    "thumb": true,
    "thumb_side": "r",
    "short": true,
    "metrics": {
      "sfb": 0.7717,
      "sfs": 3.478,
      "lsb": 0.8466,
      "scissor": 0.3265,
      "rolls": 43.6275,
      "roll_in": 31.7944,
      "roll_out": 11.8331,
      "redir": 1.1002,
      "pinky_off": 1.8821,
      "pinky_usage": 10.9142,
      "pinky_scissor": 0.2397,
      "alternation": 18.8013
    }
  },
  {
    "name": "Night",
    "year": "2024",
    "url": "https://luminespire.github.io/night/home.html",
    "thumb": true,
    "thumb_side": "l",
    "short": true,
    "metrics": {
      "sfb": 0.4078,
      "sfs": 2.3015,
      "lsb": 1.2589,
      "scissor": 0.6254,
      "rolls": 45.8687,
      "roll_in": 23.5136,
      "roll_out": 22.3551,
      "redir": 2.9995,
      "pinky_off": 3.0642,
      "pinky_usage": 17.7053,
      "pinky_scissor": 0.4411,
      "alternation": 18.8237
    }
  },
  {
    "name": "Enthium v10",
    "year": "2025",
    "url": "https://github.com/sunaku/enthium",
    "thumb": true,
    "thumb_side": "r",
    "short": false,
    "metrics": {
      "sfb": 0.425,
      "sfs": 2.5354,
      "lsb": 0.1517,
      "scissor": 0.0848,
      "rolls": 46.5243,
      "roll_in": 29.4444,
      "roll_out": 17.0799,
      "redir": 2.1766,
      "pinky_off": 3.3106,
      "pinky_usage": 15.2512,
      "pinky_scissor": 0.3714,
      "alternation": 18.3687
    }
  },
  {
    "name": "Enthium v14",
    "year": "2026",
    "url": "https://github.com/sunaku/enthium",
    "thumb": true,
    "thumb_side": "r",
    "short": true,
    "metrics": {
      "sfb": 0.5516,
      "sfs": 2.6694,
      "lsb": 0.0687,
      "scissor": 0.1552,
      "rolls": 45.8189,
      "roll_in": 28.5392,
      "roll_out": 17.2797,
      "redir": 1.4792,
      "pinky_off": 2.9146,
      "pinky_usage": 14.4436,
      "pinky_scissor": 0.31,
      "alternation": 18.76
    }
  },
  {
    "name": "Anymak",
    "year": "2025",
    "url": "https://github.com/rpnfan/Anymak",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 1.1794,
      "sfs": 4.7381,
      "lsb": 1.1643,
      "scissor": 0.0975,
      "rolls": 42.5158,
      "roll_in": 28.5529,
      "roll_out": 13.9629,
      "redir": 1.699,
      "pinky_off": 2.2001,
      "pinky_usage": 13.543,
      "pinky_scissor": 0.2562,
      "alternation": 17.5068
    }
  },
  {
    "name": "Stand",
    "year": "2026",
    "url": "https://layouts.wiki/layouts/2026/stand/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.5221,
      "sfs": 2.7943,
      "lsb": 2.525,
      "scissor": 0.4218,
      "rolls": 52.7756,
      "roll_in": 24.7103,
      "roll_out": 28.0652,
      "redir": 4.5632,
      "pinky_off": 4.4986,
      "pinky_usage": 18.9489,
      "pinky_scissor": 0.5891,
      "alternation": 13.7078
    }
  },
  {
    "name": "Pine v4",
    "year": "2021",
    "url": "https://layouts.wiki/layouts/2021/pine/",
    "thumb": false,
    "thumb_side": "",
    "short": true,
    "metrics": {
      "sfb": 0.6911,
      "sfs": 2.8964,
      "lsb": 1.4731,
      "scissor": 0.2564,
      "rolls": 45.856,
      "roll_in": 22.5532,
      "roll_out": 23.3027,
      "redir": 3.1028,
      "pinky_off": 2.8128,
      "pinky_usage": 17.4031,
      "pinky_scissor": 0.8411,
      "alternation": 17.6886
    }
  },
  {
    "name": "Bunya",
    "year": "2025",
    "url": "https://layouts.wiki/layouts/2023/bunya/",
    "thumb": true,
    "thumb_side": "l",
    "short": false,
    "metrics": {
      "sfb": 0.3977,
      "sfs": 2.1384,
      "lsb": 0.8848,
      "scissor": 0.1252,
      "rolls": 46.6064,
      "roll_in": 21.8307,
      "roll_out": 24.7757,
      "redir": 1.5209,
      "pinky_off": 3.1106,
      "pinky_usage": 17.767,
      "pinky_scissor": 0.4771,
      "alternation": 19.295
    }
  },
  {
    "name": "Gralmak",
    "year": "2025",
    "url": "https://github.com/DreymaR/Gralmak",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.8153,
      "sfs": 2.8557,
      "lsb": 0.9111,
      "scissor": 0.4319,
      "rolls": 45.7769,
      "roll_in": 21.6222,
      "roll_out": 24.1547,
      "redir": 1.8073,
      "pinky_off": 1.8962,
      "pinky_usage": 16.2971,
      "pinky_scissor": 0.2935,
      "alternation": 18.4273
    }
  },
  {
    "name": "Noctum",
    "year": "2023",
    "url": "https://oxey.dev/layouts/noctum/index.html",
    "thumb": false,
    "thumb_side": "",
    "short": false,
    "metrics": {
      "sfb": 0.6089,
      "sfs": 2.8951,
      "lsb": 1.3255,
      "scissor": 0.4929,
      "rolls": 45.3523,
      "roll_in": 26.8779,
      "roll_out": 18.4745,
      "redir": 2.6304,
      "pinky_off": 3.0712,
      "pinky_usage": 17.7148,
      "pinky_scissor": 0.4566,
      "alternation": 18.205
    }
  }
];

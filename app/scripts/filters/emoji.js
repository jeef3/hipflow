'use strict';

angular.module('hipflowApp')
  .filter('emoji', function () {
    var emojiMap = {
      '\\+1': ['\ud83d\udc4d'],
      '-1': ['\ud83d\udc4e'],
      100: ['\ud83d\udcaf'],
      1234: ['\ud83d\udd22'],
      '8ball': ['\ud83c\udfb1'],
      a: ['\ud83c\udd70'],
      ab: ['\ud83c\udd8e'],
      abc: ['\ud83d\udd24'],
      abcd: ['\ud83d\udd21'],
      accept: ['\ud83c\ude51'],
      aerial_tramway: ['\ud83d\udea1'],
      airplane: ['\u2708', '\u2708\ufe0f'],
      alarm_clock: ['\u23f0'],
      alien: ['\ud83d\udc7d'],
      ambulance: ['\ud83d\ude91'],
      anchor: ['\u2693', '\u2693\ufe0f'],
      angel: ['\ud83d\udc7c'],
      anger: ['\ud83d\udca2'],
      angry: ['\ud83d\ude20'],
      anguished: ['\ud83d\ude27'],
      ant: ['\ud83d\udc1c'],
      apple: ['\ud83c\udf4e'],
      aquarius: ['\u2652', '\u2652\ufe0f'],
      aries: ['\u2648', '\u2648\ufe0f'],
      arrow_backward: ['\u25c0', '\u25c0\ufe0f'],
      arrow_double_down: ['\u23ec'],
      arrow_double_up: ['\u23eb'],
      arrow_down: ['\u2b07', '\u2b07\ufe0f'],
      arrow_down_small: ['\ud83d\udd3d'],
      arrow_forward: ['\u25b6', '\u25b6\ufe0f'],
      arrow_heading_down: ['\u2935', '\u2935\ufe0f'],
      arrow_heading_up: ['\u2934', '\u2934\ufe0f'],
      arrow_left: ['\u2b05', '\u2b05\ufe0f'],
      arrow_lower_left: ['\u2199', '\u2199\ufe0f'],
      arrow_lower_right: ['\u2198', '\u2198\ufe0f'],
      arrow_right: ['\u27a1', '\u27a1\ufe0f'],
      arrow_right_hook: ['\u21aa', '\u21aa\ufe0f'],
      arrow_up: ['\u2b06', '\u2b06\ufe0f'],
      arrow_up_down: ['\u2195', '\u2195\ufe0f'],
      arrow_up_small: ['\ud83d\udd3c'],
      arrow_upper_left: ['\u2196', '\u2196\ufe0f'],
      arrow_upper_right: ['\u2197', '\u2197\ufe0f'],
      arrows_clockwise: ['\ud83d\udd03'],
      arrows_counterclockwise: ['\ud83d\udd04'],
      art: ['\ud83c\udfa8'],
      articulated_lorry: ['\ud83d\ude9b'],
      astonished: ['\ud83d\ude32'],
      athletic_shoe: ['\ud83d\udc5f'],
      atm: ['\ud83c\udfe7'],
      b: ['\ud83c\udd71'],
      baby: ['\ud83d\udc76'],
      baby_bottle: ['\ud83c\udf7c'],
      baby_chick: ['\ud83d\udc24'],
      baby_symbol: ['\ud83d\udebc'],
      back: ['\ud83d\udd19'],
      baggage_claim: ['\ud83d\udec4'],
      balloon: ['\ud83c\udf88'],
      ballot_box_with_check: ['\u2611', '\u2611\ufe0f'],
      bamboo: ['\ud83c\udf8d'],
      banana: ['\ud83c\udf4c'],
      bangbang: ['\u203c', '\u203c\ufe0f'],
      bank: ['\ud83c\udfe6'],
      bar_chart: ['\ud83d\udcca'],
      barber: ['\ud83d\udc88'],
      baseball: ['\u26be', '\u26be\ufe0f'],
      basketball: ['\ud83c\udfc0'],
      bath: ['\ud83d\udec0'],
      bathtub: ['\ud83d\udec1'],
      battery: ['\ud83d\udd0b'],
      bear: ['\ud83d\udc3b'],
      bee: ['\ud83d\udc1d'],
      beer: ['\ud83c\udf7a'],
      beers: ['\ud83c\udf7b'],
      beetle: ['\ud83d\udc1e'],
      beginner: ['\ud83d\udd30'],
      bell: ['\ud83d\udd14'],
      bento: ['\ud83c\udf71'],
      bicyclist: ['\ud83d\udeb4'],
      bike: ['\ud83d\udeb2'],
      bikini: ['\ud83d\udc59'],
      bird: ['\ud83d\udc26'],
      birthday: ['\ud83c\udf82'],
      black_circle: ['\u26ab', '\u26ab\ufe0f'],
      black_joker: ['\ud83c\udccf'],
      black_large_square: ['\u2b1b', '\u2b1b\ufe0f'],
      black_medium_small_square: ['\u25fe', '\u25fe\ufe0f'],
      black_medium_square: ['\u25fc', '\u25fc\ufe0f'],
      black_nib: ['\u2712', '\u2712\ufe0f'],
      black_small_square: ['\u25aa', '\u25aa\ufe0f'],
      black_square_button: ['\ud83d\udd32'],
      blossom: ['\ud83c\udf3c'],
      blowfish: ['\ud83d\udc21'],
      blue_book: ['\ud83d\udcd8'],
      blue_car: ['\ud83d\ude99'],
      blue_heart: ['\ud83d\udc99'],
      blush: ['\ud83d\ude0a'],
      boar: ['\ud83d\udc17'],
      boat: ['\u26f5', '\u26f5\ufe0f'],
      bomb: ['\ud83d\udca3'],
      book: ['\ud83d\udcd6'],
      bookmark: ['\ud83d\udd16'],
      bookmark_tabs: ['\ud83d\udcd1'],
      books: ['\ud83d\udcda'],
      boom: ['\ud83d\udca5'],
      boot: ['\ud83d\udc62'],
      bouquet: ['\ud83d\udc90'],
      bow: ['\ud83d\ude47'],
      bowling: ['\ud83c\udfb3'],
      bowtie: null,
      boy: ['\ud83d\udc66'],
      bread: ['\ud83c\udf5e'],
      bride_with_veil: ['\ud83d\udc70'],
      bridge_at_night: ['\ud83c\udf09'],
      briefcase: ['\ud83d\udcbc'],
      broken_heart: ['\ud83d\udc94'],
      bug: ['\ud83d\udc1b'],
      bulb: ['\ud83d\udca1'],
      bullettrain_front: ['\ud83d\ude85'],
      bullettrain_side: ['\ud83d\ude84'],
      bus: ['\ud83d\ude8c'],
      busstop: ['\ud83d\ude8f'],
      bust_in_silhouette: ['\ud83d\udc64'],
      busts_in_silhouette: ['\ud83d\udc65'],
      cactus: ['\ud83c\udf35'],
      cake: ['\ud83c\udf70'],
      calendar: ['\ud83d\udcc6'],
      calling: ['\ud83d\udcf2'],
      camel: ['\ud83d\udc2b'],
      camera: ['\ud83d\udcf7'],
      cancer: ['\u264b', '\u264b\ufe0f'],
      candy: ['\ud83c\udf6c'],
      capital_abcd: ['\ud83d\udd20'],
      capricorn: ['\u2651', '\u2651\ufe0f'],
      car: ['\ud83d\ude97'],
      card_index: ['\ud83d\udcc7'],
      carousel_horse: ['\ud83c\udfa0'],
      cat: ['\ud83d\udc31'],
      cat2: ['\ud83d\udc08'],
      cd: ['\ud83d\udcbf'],
      chart: ['\ud83d\udcb9'],
      chart_with_downwards_trend: ['\ud83d\udcc9'],
      chart_with_upwards_trend: ['\ud83d\udcc8'],
      checkered_flag: ['\ud83c\udfc1'],
      cherries: ['\ud83c\udf52'],
      cherry_blossom: ['\ud83c\udf38'],
      chestnut: ['\ud83c\udf30'],
      chicken: ['\ud83d\udc14'],
      children_crossing: ['\ud83d\udeb8'],
      chocolate_bar: ['\ud83c\udf6b'],
      christmas_tree: ['\ud83c\udf84'],
      church: ['\u26ea', '\u26ea\ufe0f'],
      cinema: ['\ud83c\udfa6'],
      circus_tent: ['\ud83c\udfaa'],
      city_sunrise: ['\ud83c\udf07'],
      city_sunset: ['\ud83c\udf06'],
      cl: ['\ud83c\udd91'],
      clap: ['\ud83d\udc4f'],
      clapper: ['\ud83c\udfac'],
      clipboard: ['\ud83d\udccb'],
      clock1: ['\ud83d\udd50'],
      clock10: ['\ud83d\udd59'],
      clock1030: ['\ud83d\udd65'],
      clock11: ['\ud83d\udd5a'],
      clock1130: ['\ud83d\udd66'],
      clock12: ['\ud83d\udd5b'],
      clock1230: ['\ud83d\udd67'],
      clock130: ['\ud83d\udd5c'],
      clock2: ['\ud83d\udd51'],
      clock230: ['\ud83d\udd5d'],
      clock3: ['\ud83d\udd52'],
      clock330: ['\ud83d\udd5e'],
      clock4: ['\ud83d\udd53'],
      clock430: ['\ud83d\udd5f'],
      clock5: ['\ud83d\udd54'],
      clock530: ['\ud83d\udd60'],
      clock6: ['\ud83d\udd55'],
      clock630: ['\ud83d\udd61'],
      clock7: ['\ud83d\udd56'],
      clock730: ['\ud83d\udd62'],
      clock8: ['\ud83d\udd57'],
      clock830: ['\ud83d\udd63'],
      clock9: ['\ud83d\udd58'],
      clock930: ['\ud83d\udd64'],
      closed_book: ['\ud83d\udcd5'],
      closed_lock_with_key: ['\ud83d\udd10'],
      closed_umbrella: ['\ud83c\udf02'],
      cloud: ['\u2601', '\u2601\ufe0f'],
      clubs: ['\u2663', '\u2663\ufe0f'],
      cn: ['\ud83c\udde8\ud83c\uddf3'],
      cocktail: ['\ud83c\udf78'],
      coffee: ['\u2615', '\u2615\ufe0f'],
      cold_sweat: ['\ud83d\ude30'],
      collision: ['\ud83d\udca5'],
      computer: ['\ud83d\udcbb'],
      confetti_ball: ['\ud83c\udf8a'],
      confounded: ['\ud83d\ude16'],
      confused: ['\ud83d\ude15'],
      congratulations: ['\u3297', '\u3297\ufe0f'],
      construction: ['\ud83d\udea7'],
      construction_worker: ['\ud83d\udc77'],
      convenience_store: ['\ud83c\udfea'],
      cookie: ['\ud83c\udf6a'],
      cool: ['\ud83c\udd92'],
      cop: ['\ud83d\udc6e'],
      copyright: ['\xa9'],
      corn: ['\ud83c\udf3d'],
      couple: ['\ud83d\udc6b'],
      couple_with_heart: ['\ud83d\udc91'],
      couplekiss: ['\ud83d\udc8f'],
      cow: ['\ud83d\udc2e'],
      cow2: ['\ud83d\udc04'],
      credit_card: ['\ud83d\udcb3'],
      crescent_moon: ['\ud83c\udf19'],
      crocodile: ['\ud83d\udc0a'],
      crossed_flags: ['\ud83c\udf8c'],
      crown: ['\ud83d\udc51'],
      cry: ['\ud83d\ude22'],
      crying_cat_face: ['\ud83d\ude3f'],
      crystal_ball: ['\ud83d\udd2e'],
      cupid: ['\ud83d\udc98'],
      curly_loop: ['\u27b0'],
      currency_exchange: ['\ud83d\udcb1'],
      curry: ['\ud83c\udf5b'],
      custard: ['\ud83c\udf6e'],
      customs: ['\ud83d\udec3'],
      cyclone: ['\ud83c\udf00'],
      dancer: ['\ud83d\udc83'],
      dancers: ['\ud83d\udc6f'],
      dango: ['\ud83c\udf61'],
      dart: ['\ud83c\udfaf'],
      dash: ['\ud83d\udca8'],
      date: ['\ud83d\udcc5'],
      de: ['\ud83c\udde9\ud83c\uddea'],
      deciduous_tree: ['\ud83c\udf33'],
      department_store: ['\ud83c\udfec'],
      diamond_shape_with_a_dot_inside: ['\ud83d\udca0'],
      diamonds: ['\u2666', '\u2666\ufe0f'],
      disappointed: ['\ud83d\ude1e'],
      disappointed_relieved: ['\ud83d\ude25'],
      dizzy: ['\ud83d\udcab'],
      dizzy_face: ['\ud83d\ude35'],
      do_not_litter: ['\ud83d\udeaf'],
      dog: ['\ud83d\udc36'],
      dog2: ['\ud83d\udc15'],
      dollar: ['\ud83d\udcb5'],
      dolls: ['\ud83c\udf8e'],
      dolphin: ['\ud83d\udc2c'],
      door: ['\ud83d\udeaa'],
      doughnut: ['\ud83c\udf69'],
      dragon: ['\ud83d\udc09'],
      dragon_face: ['\ud83d\udc32'],
      dress: ['\ud83d\udc57'],
      dromedary_camel: ['\ud83d\udc2a'],
      droplet: ['\ud83d\udca7'],
      dvd: ['\ud83d\udcc0'],
      'e-mail': ['\ud83d\udce7'],
      ear: ['\ud83d\udc42'],
      ear_of_rice: ['\ud83c\udf3e'],
      earth_africa: ['\ud83c\udf0d'],
      earth_americas: ['\ud83c\udf0e'],
      earth_asia: ['\ud83c\udf0f'],
      egg: ['\ud83c\udf73'],
      eggplant: ['\ud83c\udf46'],
      eight: ['8\u20e3', '8\ufe0f\u20e3'],
      eight_pointed_black_star: ['\u2734', '\u2734\ufe0f'],
      eight_spoked_asterisk: ['\u2733', '\u2733\ufe0f'],
      electric_plug: ['\ud83d\udd0c'],
      elephant: ['\ud83d\udc18'],
      email: ['\u2709', '\u2709\ufe0f'],
      end: ['\ud83d\udd1a'],
      envelope: ['\u2709', '\u2709\ufe0f'],
      envelope_with_arrow: ['\ud83d\udce9'],
      es: ['\ud83c\uddea\ud83c\uddf8'],
      euro: ['\ud83d\udcb6'],
      european_castle: ['\ud83c\udff0'],
      european_post_office: ['\ud83c\udfe4'],
      evergreen_tree: ['\ud83c\udf32'],
      exclamation: ['\u2757', '\u2757\ufe0f'],
      expressionless: ['\ud83d\ude11'],
      eyeglasses: ['\ud83d\udc53'],
      eyes: ['\ud83d\udc40'],
      facepunch: ['\ud83d\udc4a'],
      factory: ['\ud83c\udfed'],
      fallen_leaf: ['\ud83c\udf42'],
      family: ['\ud83d\udc6a'],
      fast_forward: ['\u23e9'],
      fax: ['\ud83d\udce0'],
      fearful: ['\ud83d\ude28'],
      feelsgood: null,
      feet: ['\ud83d\udc3e'],
      ferris_wheel: ['\ud83c\udfa1'],
      file_folder: ['\ud83d\udcc1'],
      finnadie: null,
      fire: ['\ud83d\udd25'],
      fire_engine: ['\ud83d\ude92'],
      fireworks: ['\ud83c\udf86'],
      first_quarter_moon: ['\ud83c\udf13'],
      first_quarter_moon_with_face: ['\ud83c\udf1b'],
      fish: ['\ud83d\udc1f'],
      fish_cake: ['\ud83c\udf65'],
      fishing_pole_and_fish: ['\ud83c\udfa3'],
      fist: ['\u270a'],
      five: ['5\u20e3', '5\ufe0f\u20e3'],
      flags: ['\ud83c\udf8f'],
      flashlight: ['\ud83d\udd26'],
      flipper: ['\ud83d\udc2c'],
      floppy_disk: ['\ud83d\udcbe'],
      flower_playing_cards: ['\ud83c\udfb4'],
      flushed: ['\ud83d\ude33'],
      foggy: ['\ud83c\udf01'],
      football: ['\ud83c\udfc8'],
      footprints: ['\ud83d\udc63'],
      fork_and_knife: ['\ud83c\udf74'],
      fountain: ['\u26f2', '\u26f2\ufe0f'],
      four: ['4\u20e3', '4\ufe0f\u20e3'],
      four_leaf_clover: ['\ud83c\udf40'],
      fr: ['\ud83c\uddeb\ud83c\uddf7'],
      free: ['\ud83c\udd93'],
      fried_shrimp: ['\ud83c\udf64'],
      fries: ['\ud83c\udf5f'],
      frog: ['\ud83d\udc38'],
      frowning: ['\ud83d\ude26'],
      fu: null,
      fuelpump: ['\u26fd', '\u26fd\ufe0f'],
      full_moon: ['\ud83c\udf15'],
      full_moon_with_face: ['\ud83c\udf1d'],
      game_die: ['\ud83c\udfb2'],
      gb: ['\ud83c\uddec\ud83c\udde7'],
      gem: ['\ud83d\udc8e'],
      gemini: ['\u264a', '\u264a\ufe0f'],
      ghost: ['\ud83d\udc7b'],
      gift: ['\ud83c\udf81'],
      gift_heart: ['\ud83d\udc9d'],
      girl: ['\ud83d\udc67'],
      globe_with_meridians: ['\ud83c\udf10'],
      goat: ['\ud83d\udc10'],
      goberserk: null,
      godmode: null,
      golf: ['\u26f3', '\u26f3\ufe0f'],
      grapes: ['\ud83c\udf47'],
      green_apple: ['\ud83c\udf4f'],
      green_book: ['\ud83d\udcd7'],
      green_heart: ['\ud83d\udc9a'],
      grey_exclamation: ['\u2755'],
      grey_question: ['\u2754'],
      grimacing: ['\ud83d\ude2c'],
      grin: ['\ud83d\ude01'],
      grinning: ['\ud83d\ude00'],
      guardsman: ['\ud83d\udc82'],
      guitar: ['\ud83c\udfb8'],
      gun: ['\ud83d\udd2b'],
      haircut: ['\ud83d\udc87'],
      hamburger: ['\ud83c\udf54'],
      hammer: ['\ud83d\udd28'],
      hamster: ['\ud83d\udc39'],
      hand: ['\u270b'],
      handbag: ['\ud83d\udc5c'],
      hankey: ['\ud83d\udca9'],
      hash: ['#\u20e3', '#\ufe0f\u20e3'],
      hatched_chick: ['\ud83d\udc25'],
      hatching_chick: ['\ud83d\udc23'],
      headphones: ['\ud83c\udfa7'],
      hear_no_evil: ['\ud83d\ude49'],
      heart: ['\u2764', '\u2764\ufe0f'],
      heart_decoration: ['\ud83d\udc9f'],
      heart_eyes: ['\ud83d\ude0d'],
      heart_eyes_cat: ['\ud83d\ude3b'],
      heartbeat: ['\ud83d\udc93'],
      heartpulse: ['\ud83d\udc97'],
      hearts: ['\u2665', '\u2665\ufe0f'],
      heavy_check_mark: ['\u2714', '\u2714\ufe0f'],
      heavy_division_sign: ['\u2797'],
      heavy_dollar_sign: ['\ud83d\udcb2'],
      heavy_exclamation_mark: ['\u2757', '\u2757\ufe0f'],
      heavy_minus_sign: ['\u2796'],
      heavy_multiplication_x: ['\u2716', '\u2716\ufe0f'],
      heavy_plus_sign: ['\u2795'],
      helicopter: ['\ud83d\ude81'],
      herb: ['\ud83c\udf3f'],
      hibiscus: ['\ud83c\udf3a'],
      high_brightness: ['\ud83d\udd06'],
      high_heel: ['\ud83d\udc60'],
      hocho: ['\ud83d\udd2a'],
      honey_pot: ['\ud83c\udf6f'],
      honeybee: ['\ud83d\udc1d'],
      horse: ['\ud83d\udc34'],
      horse_racing: ['\ud83c\udfc7'],
      hospital: ['\ud83c\udfe5'],
      hotel: ['\ud83c\udfe8'],
      hotsprings: ['\u2668', '\u2668\ufe0f'],
      hourglass: ['\u231b', '\u231b\ufe0f'],
      hourglass_flowing_sand: ['\u23f3'],
      house: ['\ud83c\udfe0'],
      house_with_garden: ['\ud83c\udfe1'],
      hurtrealbad: null,
      hushed: ['\ud83d\ude2f'],
      ice_cream: ['\ud83c\udf68'],
      icecream: ['\ud83c\udf66'],
      id: ['\ud83c\udd94'],
      ideograph_advantage: ['\ud83c\ude50'],
      imp: ['\ud83d\udc7f'],
      inbox_tray: ['\ud83d\udce5'],
      incoming_envelope: ['\ud83d\udce8'],
      information_desk_person: ['\ud83d\udc81'],
      information_source: ['\u2139', '\u2139\ufe0f'],
      innocent: ['\ud83d\ude07'],
      interrobang: ['\u2049', '\u2049\ufe0f'],
      iphone: ['\ud83d\udcf1'],
      it: ['\ud83c\uddee\ud83c\uddf9'],
      izakaya_lantern: ['\ud83c\udfee'],
      jack_o_lantern: ['\ud83c\udf83'],
      japan: ['\ud83d\uddfe'],
      japanese_castle: ['\ud83c\udfef'],
      japanese_goblin: ['\ud83d\udc7a'],
      japanese_ogre: ['\ud83d\udc79'],
      jeans: ['\ud83d\udc56'],
      joy: ['\ud83d\ude02'],
      joy_cat: ['\ud83d\ude39'],
      jp: ['\ud83c\uddef\ud83c\uddf5'],
      key: ['\ud83d\udd11'],
      keycap_ten: ['\ud83d\udd1f'],
      kimono: ['\ud83d\udc58'],
      kiss: ['\ud83d\udc8b'],
      kissing: ['\ud83d\ude17'],
      kissing_cat: ['\ud83d\ude3d'],
      kissing_closed_eyes: ['\ud83d\ude1a'],
      kissing_heart: ['\ud83d\ude18'],
      kissing_smiling_eyes: ['\ud83d\ude19'],
      koala: ['\ud83d\udc28'],
      koko: ['\ud83c\ude01'],
      kr: ['\ud83c\uddf0\ud83c\uddf7'],
      lantern: ['\ud83c\udfee'],
      large_blue_circle: ['\ud83d\udd35'],
      large_blue_diamond: ['\ud83d\udd37'],
      large_orange_diamond: ['\ud83d\udd36'],
      last_quarter_moon: ['\ud83c\udf17'],
      last_quarter_moon_with_face: ['\ud83c\udf1c'],
      laughing: ['\ud83d\ude06'],
      leaves: ['\ud83c\udf43'],
      ledger: ['\ud83d\udcd2'],
      left_luggage: ['\ud83d\udec5'],
      left_right_arrow: ['\u2194', '\u2194\ufe0f'],
      leftwards_arrow_with_hook: ['\u21a9', '\u21a9\ufe0f'],
      lemon: ['\ud83c\udf4b'],
      leo: ['\u264c', '\u264c\ufe0f'],
      leopard: ['\ud83d\udc06'],
      libra: ['\u264e', '\u264e\ufe0f'],
      light_rail: ['\ud83d\ude88'],
      link: ['\ud83d\udd17'],
      lips: ['\ud83d\udc44'],
      lipstick: ['\ud83d\udc84'],
      lock: ['\ud83d\udd12'],
      lock_with_ink_pen: ['\ud83d\udd0f'],
      lollipop: ['\ud83c\udf6d'],
      loop: ['\u27bf'],
      loud_sound: ['\ud83d\udd0a'],
      loudspeaker: ['\ud83d\udce2'],
      love_hotel: ['\ud83c\udfe9'],
      love_letter: ['\ud83d\udc8c'],
      low_brightness: ['\ud83d\udd05'],
      m: ['\u24c2', '\u24c2\ufe0f'],
      mag: ['\ud83d\udd0d'],
      mag_right: ['\ud83d\udd0e'],
      mahjong: ['\ud83c\udc04', '\ud83c\udc04\ufe0f'],
      mailbox: ['\ud83d\udceb'],
      mailbox_closed: ['\ud83d\udcea'],
      mailbox_with_mail: ['\ud83d\udcec'],
      mailbox_with_no_mail: ['\ud83d\udced'],
      man: ['\ud83d\udc68'],
      man_with_gua_pi_mao: ['\ud83d\udc72'],
      man_with_turban: ['\ud83d\udc73'],
      mans_shoe: ['\ud83d\udc5e'],
      maple_leaf: ['\ud83c\udf41'],
      mask: ['\ud83d\ude37'],
      massage: ['\ud83d\udc86'],
      meat_on_bone: ['\ud83c\udf56'],
      mega: ['\ud83d\udce3'],
      melon: ['\ud83c\udf48'],
      memo: ['\ud83d\udcdd'],
      mens: ['\ud83d\udeb9'],
      metal: null,
      metro: ['\ud83d\ude87'],
      microphone: ['\ud83c\udfa4'],
      microscope: ['\ud83d\udd2c'],
      milky_way: ['\ud83c\udf0c'],
      minibus: ['\ud83d\ude90'],
      minidisc: ['\ud83d\udcbd'],
      mobile_phone_off: ['\ud83d\udcf4'],
      money_with_wings: ['\ud83d\udcb8'],
      moneybag: ['\ud83d\udcb0'],
      monkey: ['\ud83d\udc12'],
      monkey_face: ['\ud83d\udc35'],
      monorail: ['\ud83d\ude9d'],
      moon: ['\ud83c\udf14'],
      mortar_board: ['\ud83c\udf93'],
      mount_fuji: ['\ud83d\uddfb'],
      mountain_bicyclist: ['\ud83d\udeb5'],
      mountain_cableway: ['\ud83d\udea0'],
      mountain_railway: ['\ud83d\ude9e'],
      mouse: ['\ud83d\udc2d'],
      mouse2: ['\ud83d\udc01'],
      movie_camera: ['\ud83c\udfa5'],
      moyai: ['\ud83d\uddff'],
      muscle: ['\ud83d\udcaa'],
      mushroom: ['\ud83c\udf44'],
      musical_keyboard: ['\ud83c\udfb9'],
      musical_note: ['\ud83c\udfb5'],
      musical_score: ['\ud83c\udfbc'],
      mute: ['\ud83d\udd07'],
      nail_care: ['\ud83d\udc85'],
      name_badge: ['\ud83d\udcdb'],
      neckbeard: null,
      necktie: ['\ud83d\udc54'],
      negative_squared_cross_mark: ['\u274e'],
      neutral_face: ['\ud83d\ude10'],
      'new': ['\ud83c\udd95'],
      new_moon: ['\ud83c\udf11'],
      new_moon_with_face: ['\ud83c\udf1a'],
      newspaper: ['\ud83d\udcf0'],
      ng: ['\ud83c\udd96'],
      night_with_stars: ['\ud83c\udf03'],
      nine: ['9\u20e3', '9\ufe0f\u20e3'],
      no_bell: ['\ud83d\udd15'],
      no_bicycles: ['\ud83d\udeb3'],
      no_entry: ['\u26d4', '\u26d4\ufe0f'],
      no_entry_sign: ['\ud83d\udeab'],
      no_good: ['\ud83d\ude45'],
      no_mobile_phones: ['\ud83d\udcf5'],
      no_mouth: ['\ud83d\ude36'],
      no_pedestrians: ['\ud83d\udeb7'],
      no_smoking: ['\ud83d\udead'],
      'non-potable_water': ['\ud83d\udeb1'],
      nose: ['\ud83d\udc43'],
      notebook: ['\ud83d\udcd3'],
      notebook_with_decorative_cover: ['\ud83d\udcd4'],
      notes: ['\ud83c\udfb6'],
      nut_and_bolt: ['\ud83d\udd29'],
      o: ['\u2b55', '\u2b55\ufe0f'],
      o2: ['\ud83c\udd7e'],
      ocean: ['\ud83c\udf0a'],
      octocat: null,
      octopus: ['\ud83d\udc19'],
      oden: ['\ud83c\udf62'],
      office: ['\ud83c\udfe2'],
      ok: ['\ud83c\udd97'],
      ok_hand: ['\ud83d\udc4c'],
      ok_woman: ['\ud83d\ude46'],
      older_man: ['\ud83d\udc74'],
      older_woman: ['\ud83d\udc75'],
      on: ['\ud83d\udd1b'],
      oncoming_automobile: ['\ud83d\ude98'],
      oncoming_bus: ['\ud83d\ude8d'],
      oncoming_police_car: ['\ud83d\ude94'],
      oncoming_taxi: ['\ud83d\ude96'],
      one: ['1\u20e3', '1\ufe0f\u20e3'],
      open_book: ['\ud83d\udcd6'],
      open_file_folder: ['\ud83d\udcc2'],
      open_hands: ['\ud83d\udc50'],
      open_mouth: ['\ud83d\ude2e'],
      ophiuchus: ['\u26ce'],
      orange_book: ['\ud83d\udcd9'],
      outbox_tray: ['\ud83d\udce4'],
      ox: ['\ud83d\udc02'],
      'package': ['\ud83d\udce6'],
      page_facing_up: ['\ud83d\udcc4'],
      page_with_curl: ['\ud83d\udcc3'],
      pager: ['\ud83d\udcdf'],
      palm_tree: ['\ud83c\udf34'],
      panda_face: ['\ud83d\udc3c'],
      paperclip: ['\ud83d\udcce'],
      parking: ['\ud83c\udd7f', '\ud83c\udd7f\ufe0f'],
      part_alternation_mark: ['\u303d', '\u303d\ufe0f'],
      partly_sunny: ['\u26c5', '\u26c5\ufe0f'],
      passport_control: ['\ud83d\udec2'],
      paw_prints: ['\ud83d\udc3e'],
      peach: ['\ud83c\udf51'],
      pear: ['\ud83c\udf50'],
      pencil: ['\ud83d\udcdd'],
      pencil2: ['\u270f', '\u270f\ufe0f'],
      penguin: ['\ud83d\udc27'],
      pensive: ['\ud83d\ude14'],
      performing_arts: ['\ud83c\udfad'],
      persevere: ['\ud83d\ude23'],
      person_frowning: ['\ud83d\ude4d'],
      person_with_blond_hair: ['\ud83d\udc71'],
      person_with_pouting_face: ['\ud83d\ude4e'],
      phone: ['\u260e', '\u260e\ufe0f'],
      pig: ['\ud83d\udc37'],
      pig2: ['\ud83d\udc16'],
      pig_nose: ['\ud83d\udc3d'],
      pill: ['\ud83d\udc8a'],
      pineapple: ['\ud83c\udf4d'],
      pisces: ['\u2653', '\u2653\ufe0f'],
      pizza: ['\ud83c\udf55'],
      point_down: ['\ud83d\udc47'],
      point_left: ['\ud83d\udc48'],
      point_right: ['\ud83d\udc49'],
      point_up: ['\u261d', '\u261d\ufe0f'],
      point_up_2: ['\ud83d\udc46'],
      police_car: ['\ud83d\ude93'],
      poodle: ['\ud83d\udc29'],
      poop: ['\ud83d\udca9'],
      post_office: ['\ud83c\udfe3'],
      postal_horn: ['\ud83d\udcef'],
      postbox: ['\ud83d\udcee'],
      potable_water: ['\ud83d\udeb0'],
      pouch: ['\ud83d\udc5d'],
      poultry_leg: ['\ud83c\udf57'],
      pound: ['\ud83d\udcb7'],
      pouting_cat: ['\ud83d\ude3e'],
      pray: ['\ud83d\ude4f'],
      princess: ['\ud83d\udc78'],
      punch: ['\ud83d\udc4a'],
      purple_heart: ['\ud83d\udc9c'],
      purse: ['\ud83d\udc5b'],
      pushpin: ['\ud83d\udccc'],
      put_litter_in_its_place: ['\ud83d\udeae'],
      question: ['\u2753'],
      rabbit: ['\ud83d\udc30'],
      rabbit2: ['\ud83d\udc07'],
      racehorse: ['\ud83d\udc0e'],
      radio: ['\ud83d\udcfb'],
      radio_button: ['\ud83d\udd18'],
      rage: ['\ud83d\ude21'],
      rage1: null,
      rage2: null,
      rage3: null,
      rage4: null,
      railway_car: ['\ud83d\ude83'],
      rainbow: ['\ud83c\udf08'],
      raised_hand: ['\u270b'],
      raised_hands: ['\ud83d\ude4c'],
      raising_hand: ['\ud83d\ude4b'],
      ram: ['\ud83d\udc0f'],
      ramen: ['\ud83c\udf5c'],
      rat: ['\ud83d\udc00'],
      recycle: ['\u267b', '\u267b\ufe0f'],
      red_car: ['\ud83d\ude97'],
      red_circle: ['\ud83d\udd34'],
      registered: ['\xae'],
      relaxed: ['\u263a', '\u263a\ufe0f'],
      relieved: ['\ud83d\ude0c'],
      repeat: ['\ud83d\udd01'],
      repeat_one: ['\ud83d\udd02'],
      restroom: ['\ud83d\udebb'],
      revolving_hearts: ['\ud83d\udc9e'],
      rewind: ['\u23ea'],
      ribbon: ['\ud83c\udf80'],
      rice: ['\ud83c\udf5a'],
      rice_ball: ['\ud83c\udf59'],
      rice_cracker: ['\ud83c\udf58'],
      rice_scene: ['\ud83c\udf91'],
      ring: ['\ud83d\udc8d'],
      rocket: ['\ud83d\ude80'],
      roller_coaster: ['\ud83c\udfa2'],
      rooster: ['\ud83d\udc13'],
      rose: ['\ud83c\udf39'],
      rotating_light: ['\ud83d\udea8'],
      round_pushpin: ['\ud83d\udccd'],
      rowboat: ['\ud83d\udea3'],
      ru: ['\ud83c\uddf7\ud83c\uddfa'],
      rugby_football: ['\ud83c\udfc9'],
      runner: ['\ud83c\udfc3'],
      running: ['\ud83c\udfc3'],
      running_shirt_with_sash: ['\ud83c\udfbd'],
      sa: ['\ud83c\ude02'],
      sagittarius: ['\u2650', '\u2650\ufe0f'],
      sailboat: ['\u26f5', '\u26f5\ufe0f'],
      sake: ['\ud83c\udf76'],
      sandal: ['\ud83d\udc61'],
      santa: ['\ud83c\udf85'],
      satellite: ['\ud83d\udce1'],
      satisfied: ['\ud83d\ude06'],
      saxophone: ['\ud83c\udfb7'],
      school: ['\ud83c\udfeb'],
      school_satchel: ['\ud83c\udf92'],
      scissors: ['\u2702', '\u2702\ufe0f'],
      scorpius: ['\u264f', '\u264f\ufe0f'],
      scream: ['\ud83d\ude31'],
      scream_cat: ['\ud83d\ude40'],
      scroll: ['\ud83d\udcdc'],
      seat: ['\ud83d\udcba'],
      secret: ['\u3299', '\u3299\ufe0f'],
      see_no_evil: ['\ud83d\ude48'],
      seedling: ['\ud83c\udf31'],
      seven: ['7\u20e3', '7\ufe0f\u20e3'],
      shaved_ice: ['\ud83c\udf67'],
      sheep: ['\ud83d\udc11'],
      shell: ['\ud83d\udc1a'],
      ship: ['\ud83d\udea2'],
      shipit: null,
      shirt: ['\ud83d\udc55'],
      shit: ['\ud83d\udca9'],
      shoe: ['\ud83d\udc5e'],
      shower: ['\ud83d\udebf'],
      signal_strength: ['\ud83d\udcf6'],
      six: ['6\u20e3', '6\ufe0f\u20e3'],
      six_pointed_star: ['\ud83d\udd2f'],
      ski: ['\ud83c\udfbf'],
      skull: ['\ud83d\udc80'],
      sleeping: ['\ud83d\ude34'],
      sleepy: ['\ud83d\ude2a'],
      slot_machine: ['\ud83c\udfb0'],
      small_blue_diamond: ['\ud83d\udd39'],
      small_orange_diamond: ['\ud83d\udd38'],
      small_red_triangle: ['\ud83d\udd3a'],
      small_red_triangle_down: ['\ud83d\udd3b'],
      smile: ['\ud83d\ude04'],
      smile_cat: ['\ud83d\ude38'],
      smiley: ['\ud83d\ude03'],
      smiley_cat: ['\ud83d\ude3a'],
      smiling_imp: ['\ud83d\ude08'],
      smirk: ['\ud83d\ude0f'],
      smirk_cat: ['\ud83d\ude3c'],
      smoking: ['\ud83d\udeac'],
      snail: ['\ud83d\udc0c'],
      snake: ['\ud83d\udc0d'],
      snowboarder: ['\ud83c\udfc2'],
      snowflake: ['\u2744', '\u2744\ufe0f'],
      snowman: ['\u26c4', '\u26c4\ufe0f'],
      sob: ['\ud83d\ude2d'],
      soccer: ['\u26bd', '\u26bd\ufe0f'],
      soon: ['\ud83d\udd1c'],
      sos: ['\ud83c\udd98'],
      sound: ['\ud83d\udd09'],
      space_invader: ['\ud83d\udc7e'],
      spades: ['\u2660', '\u2660\ufe0f'],
      spaghetti: ['\ud83c\udf5d'],
      sparkle: ['\u2747', '\u2747\ufe0f'],
      sparkler: ['\ud83c\udf87'],
      sparkles: ['\u2728'],
      sparkling_heart: ['\ud83d\udc96'],
      speak_no_evil: ['\ud83d\ude4a'],
      speaker: ['\ud83d\udd08'],
      speech_balloon: ['\ud83d\udcac'],
      speedboat: ['\ud83d\udea4'],
      squirrel: null,
      star: ['\u2b50', '\u2b50\ufe0f'],
      star2: ['\ud83c\udf1f'],
      stars: ['\ud83c\udf20'],
      station: ['\ud83d\ude89'],
      statue_of_liberty: ['\ud83d\uddfd'],
      steam_locomotive: ['\ud83d\ude82'],
      stew: ['\ud83c\udf72'],
      straight_ruler: ['\ud83d\udccf'],
      strawberry: ['\ud83c\udf53'],
      stuck_out_tongue: ['\ud83d\ude1b'],
      stuck_out_tongue_closed_eyes: ['\ud83d\ude1d'],
      stuck_out_tongue_winking_eye: ['\ud83d\ude1c'],
      sun_with_face: ['\ud83c\udf1e'],
      sunflower: ['\ud83c\udf3b'],
      sunglasses: ['\ud83d\ude0e'],
      sunny: ['\u2600', '\u2600\ufe0f'],
      sunrise: ['\ud83c\udf05'],
      sunrise_over_mountains: ['\ud83c\udf04'],
      surfer: ['\ud83c\udfc4'],
      sushi: ['\ud83c\udf63'],
      suspect: null,
      suspension_railway: ['\ud83d\ude9f'],
      sweat: ['\ud83d\ude13'],
      sweat_drops: ['\ud83d\udca6'],
      sweat_smile: ['\ud83d\ude05'],
      sweet_potato: ['\ud83c\udf60'],
      swimmer: ['\ud83c\udfca'],
      symbols: ['\ud83d\udd23'],
      syringe: ['\ud83d\udc89'],
      tada: ['\ud83c\udf89'],
      tanabata_tree: ['\ud83c\udf8b'],
      tangerine: ['\ud83c\udf4a'],
      taurus: ['\u2649', '\u2649\ufe0f'],
      taxi: ['\ud83d\ude95'],
      tea: ['\ud83c\udf75'],
      telephone: ['\u260e', '\u260e\ufe0f'],
      telephone_receiver: ['\ud83d\udcde'],
      telescope: ['\ud83d\udd2d'],
      tennis: ['\ud83c\udfbe'],
      tent: ['\u26fa', '\u26fa\ufe0f'],
      thought_balloon: ['\ud83d\udcad'],
      three: ['3\u20e3', '3\ufe0f\u20e3'],
      thumbsdown: ['\ud83d\udc4e'],
      thumbsup: ['\ud83d\udc4d'],
      ticket: ['\ud83c\udfab'],
      tiger: ['\ud83d\udc2f'],
      tiger2: ['\ud83d\udc05'],
      tired_face: ['\ud83d\ude2b'],
      tm: ['\u2122'],
      toilet: ['\ud83d\udebd'],
      tokyo_tower: ['\ud83d\uddfc'],
      tomato: ['\ud83c\udf45'],
      tongue: ['\ud83d\udc45'],
      top: ['\ud83d\udd1d'],
      tophat: ['\ud83c\udfa9'],
      tractor: ['\ud83d\ude9c'],
      traffic_light: ['\ud83d\udea5'],
      train: ['\ud83d\ude8b'],
      train2: ['\ud83d\ude86'],
      tram: ['\ud83d\ude8a'],
      triangular_flag_on_post: ['\ud83d\udea9'],
      triangular_ruler: ['\ud83d\udcd0'],
      trident: ['\ud83d\udd31'],
      triumph: ['\ud83d\ude24'],
      trolleybus: ['\ud83d\ude8e'],
      trollface: null,
      trophy: ['\ud83c\udfc6'],
      tropical_drink: ['\ud83c\udf79'],
      tropical_fish: ['\ud83d\udc20'],
      truck: ['\ud83d\ude9a'],
      trumpet: ['\ud83c\udfba'],
      tshirt: ['\ud83d\udc55'],
      tulip: ['\ud83c\udf37'],
      turtle: ['\ud83d\udc22'],
      tv: ['\ud83d\udcfa'],
      twisted_rightwards_arrows: ['\ud83d\udd00'],
      two: ['2\u20e3', '2\ufe0f\u20e3'],
      two_hearts: ['\ud83d\udc95'],
      two_men_holding_hands: ['\ud83d\udc6c'],
      two_women_holding_hands: ['\ud83d\udc6d'],
      u5272: ['\ud83c\ude39'],
      u5408: ['\ud83c\ude34'],
      u55b6: ['\ud83c\ude3a'],
      u6307: ['\ud83c\ude2f', '\ud83c\ude2f\ufe0f'],
      u6708: ['\ud83c\ude37'],
      u6709: ['\ud83c\ude36'],
      u6e80: ['\ud83c\ude35'],
      u7121: ['\ud83c\ude1a', '\ud83c\ude1a\ufe0f'],
      u7533: ['\ud83c\ude38'],
      u7981: ['\ud83c\ude32'],
      u7a7a: ['\ud83c\ude33'],
      uk: ['\ud83c\uddec\ud83c\udde7'],
      umbrella: ['\u2614', '\u2614\ufe0f'],
      unamused: ['\ud83d\ude12'],
      underage: ['\ud83d\udd1e'],
      unlock: ['\ud83d\udd13'],
      up: ['\ud83c\udd99'],
      us: ['\ud83c\uddfa\ud83c\uddf8'],
      v: ['\u270c', '\u270c\ufe0f'],
      vertical_traffic_light: ['\ud83d\udea6'],
      vhs: ['\ud83d\udcfc'],
      vibration_mode: ['\ud83d\udcf3'],
      video_camera: ['\ud83d\udcf9'],
      video_game: ['\ud83c\udfae'],
      violin: ['\ud83c\udfbb'],
      virgo: ['\u264d', '\u264d\ufe0f'],
      volcano: ['\ud83c\udf0b'],
      vs: ['\ud83c\udd9a'],
      walking: ['\ud83d\udeb6'],
      waning_crescent_moon: ['\ud83c\udf18'],
      waning_gibbous_moon: ['\ud83c\udf16'],
      warning: ['\u26a0', '\u26a0\ufe0f'],
      watch: ['\u231a', '\u231a\ufe0f'],
      water_buffalo: ['\ud83d\udc03'],
      watermelon: ['\ud83c\udf49'],
      wave: ['\ud83d\udc4b'],
      wavy_dash: ['\u3030'],
      waxing_crescent_moon: ['\ud83c\udf12'],
      waxing_gibbous_moon: ['\ud83c\udf14'],
      wc: ['\ud83d\udebe'],
      weary: ['\ud83d\ude29'],
      wedding: ['\ud83d\udc92'],
      whale: ['\ud83d\udc33'],
      whale2: ['\ud83d\udc0b'],
      wheelchair: ['\u267f', '\u267f\ufe0f'],
      white_check_mark: ['\u2705'],
      white_circle: ['\u26aa', '\u26aa\ufe0f'],
      white_flower: ['\ud83d\udcae'],
      white_large_square: ['\u2b1c', '\u2b1c\ufe0f'],
      white_medium_small_square: ['\u25fd', '\u25fd\ufe0f'],
      white_medium_square: ['\u25fb', '\u25fb\ufe0f'],
      white_small_square: ['\u25ab', '\u25ab\ufe0f'],
      white_square_button: ['\ud83d\udd33'],
      wind_chime: ['\ud83c\udf90'],
      wine_glass: ['\ud83c\udf77'],
      wink: ['\ud83d\ude09'],
      wolf: ['\ud83d\udc3a'],
      woman: ['\ud83d\udc69'],
      womans_clothes: ['\ud83d\udc5a'],
      womans_hat: ['\ud83d\udc52'],
      womens: ['\ud83d\udeba'],
      worried: ['\ud83d\ude1f'],
      wrench: ['\ud83d\udd27'],
      x: ['\u274c'],
      yellow_heart: ['\ud83d\udc9b'],
      yen: ['\ud83d\udcb4'],
      yum: ['\ud83d\ude0b'],
      zap: ['\u26a1', '\u26a1\ufe0f'],
      zero: ['0\u20e3', '0\ufe0f\u20e3'],
      zzz: ['\ud83d\udca4']
    };

    var emojiKeywordIndex = {};
    var emojiUnicodes = [];

    Object.keys(emojiMap).forEach(function (keyword) {
      var emoji = emojiMap[keyword];
      if (!emoji) {
        return;
      }

      emojiUnicodes = emojiUnicodes.concat(emoji);

      emoji.forEach(function (unicode) {
        emojiKeywordIndex[unicode] = keyword;
      });
    });

    var emojiKeywordsRegex = new RegExp(':(' + Object.keys(emojiMap).join('|') + '):', 'g');
    var emojiUnicodesRegex = new RegExp('(' + emojiUnicodes.join('|') + ')', 'g');

    var makeImg = function (keyword) {
      return '<img class="emoji emoji-' + keyword + '" src="/images/emojis/' + keyword + '.png">';
    };

    return function (input) {
      if (!input) {
        return input;
      }

      // Replace keywords
      input = input.replace(emojiKeywordsRegex, function (match, keyword) {
        return makeImg(keyword);
      });

      // Replace unicode characters
      input = input.replace(emojiUnicodesRegex, function (match, character) {
        var keyword = emojiKeywordIndex[character];

        if (!keyword) {
          console.error('No keyword found for', character);
        }

        return makeImg(keyword);
      });

      return input;
    };
  });

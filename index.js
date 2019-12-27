/*
  word (string) = the word that is analyzed
  ISO_639_2 (string) = language code, default eng (english)
*/

// source: https://stackoverflow.com/questions/1072765/count-number-of-matches-of-a-regex-in-javascript#answer-1072782
const count = (str = "", reg) => {
  return ((str || "").match(reg) || []).length;
};

let analyze = (word, ISO_639_2 = "eng") => {
  if (typeof word !== "string") throw new Error("Word must be a string");
  if (typeof ISO_639_2 !== "string")
    throw new Error("ISO_639_2 must be a string");

  let keystrokes = 0;

  // first, calculate one keystroke for every letter
  keystrokes = word.length;

  // calculate all the uppercase letters of the latin alphabet
  keystrokes += count(word, /[A-Z]/g);

  // https://www.loc.gov/standards/iso639-2/php/code_list.php
  switch (ISO_639_2) {
    case "eng": // english
      // already handled above
      break;
    case "ger": // german
      keystrokes += count(word, /[ÄÖÜ]/gu); //äöü: lowercase letters are already counted above
      break;
    case "fre": // french
      keystrokes += count(word, /[âêîôû]/gu);
      keystrokes += count(word, /[ÂÊÎÔÛÄËÏÜäëïüÿ]/gu) * 2; // 3 keystrokes needed, therefore times 2 + the length of the string from above
      keystrokes += count(word, /[ÀÈÙÇÉ]/gu) * 3; // 4 keystrokes needed, therefore times 3 + the length of the string from above
      keystrokes += count(word, /[ŒœŸ]/gu) * 4; // 5 keystrokes needed, therefore times 4 + the length of the string from above
      break;
    case "por": // portuguese
      keystrokes += count(word, /[ãõáéíóú]/gu);
      keystrokes += count(word, /[àâêîôû]/gu) * 2;
      break;
    case "spa": // spanish
      keystrokes += count(word, /[áéíóúÑª]/gu);
      keystrokes += count(word, /[ÁÉÍÓÚü]/gu) * 2;
      keystrokes += count(word, /[Ü]/gu) * 3;
      break;
    case "tur": // turkish
      keystrokes += count(word, /[ÖÜÇŞĞİ]/gu);
      break;
    case "vie": // vietnamese
      keystrokes += count(word, /[ăâáàạảãđéèẻẽẹêíìỉĩịôơóòỏõọưúùủũụýỳỷỹỵ]/gu);
      keystrokes += count(word, /[ắằặẳẵấầậẩẫếềểễệốồổỗộớờởỡợứừửữự]/gu) * 2;
      break;
    case "pol": // polish
      keystrokes += count(word, /[ąćęłńóśźż]/gu);
      break;
    case "rum": // romanian
      keystrokes += count(word, /[ăâîșț]/gu);
      break;
    case "per": // persian
      keystrokes += count(word, /[ژآء ّ َ ُ ِ]/gu);
      break;
    case "dan": // danish
      keystrokes += count(word, /[ÆØÅ]/gu);
      break;
    case "dut": // dutch
      keystrokes += count(word, /[é]/gu);
      break;
    case "ita": // italian
      keystrokes += count(word, /[é]/gu);
      break;
    case "cat": // catalan
      keystrokes += count(word, /[àèòéíóúÇ]/gu);
      keystrokes += count(word, /[ÀÈÒÉÍÓÚïü]/gu) * 2;
      keystrokes += count(word, /[ÏÜ]/gu) * 3;
      break;
    case "epo": // esperanto
      keystrokes += count(word, /[ĉŭŝĝĵĥ]/gu);
      break;
    case "gre": // greek
      keystrokes += count(word, /[άήίώόύέΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/gu);
      keystrokes += count(word, /[ϊϋΐΰΆΉΊΏΌΎΈ]/gu) * 2;
      keystrokes += count(word, /[ΪΫ]/gu) * 3;
      break;
    case "cze": // czech
      keystrokes += count(word, /[ó]/gu);
      keystrokes += count(word, /[ďťňÁÉÍÓÚÝ]/gu) * 2;
      keystrokes += count(word, /[ĚŠČŘŽŇŤĎŮ]/gu) * 3;
      break;
    case "lav": // latvian
      keystrokes += count(word, /[ēūīāšģķļžčņ]/gu);
      break;
    case "lit": // lithuanian
      keystrokes += count(word, /[ąčęėįšųūž]/gu);
      break;
    case "hin": // hindi
      keystrokes += count(
        word,
        /[ऒऍॅ्रर्ज्ञत्रक्षश्रःऋऔऐआईऊभङघधझढञऑओएअइउफऱखथछठऎँणऩऴळशष।य़]/gu
      );
      break;
    case "ice": // icelandic
      keystrokes += count(word, /[éúíóáý]/gu);
      keystrokes += count(word, /[ÉÝÚÍÓÁ]/gu) * 2;
      break;
    case "chi": // simplified chinese, traditional chinese
      // just count every character as 5 keystrokes, multiply with 4 as we already counted 1 above
      keystrokes += word.length * 4;
      break;
    case "jpn": // japanese
      // instead of individual characters, we just take a look at the whole word for keystrokes calculation
      // this time keystrokes aren't added up (from above string length) but replaced/overwritten
      let japanese_words = {
        あなた: 6,
        あの: 4,
        いつ: 5,
        いっぱい: 6,
        から: 5,
        きっと: 6,
        きれいな: 8,
        ください: 8,
        くれる: 7,
        ここ: 5,
        これ: 5,
        さん: 5,
        しかし: 9,
        すごい: 6,
        すごく: 7,
        すばらしい: 11,
        する: 5,
        そういう: 6,
        そして: 8,
        その: 5,
        たいへん: 8,
        たくさん: 9,
        たち: 6,
        たぶん: 7,
        ちょっと: 7,
        できる: 7,
        です: 5,
        でも: 5,
        という: 5,
        どこ: 5,
        ところ: 7,
        として: 8,
        ない: 4,
        なる: 5,
        に: 3,
        について: 9,
        になる: 7,
        の: 3,
        ので: 5,
        へ: 3,
        ます: 5,
        みんな: 6,
        もう: 4,
        より: 5,
        わかる: 7,
        こういう: 6,
        ノート: 7,
        カメラ: 8,
        パソコン: 9,
        インターネット: 12,
        コメント: 9,
        トラック: 9,
        バック: 7,
        アメリカ: 9,
        川: 6,
        雨: 5,
        山: 6,
        右: 6,
        左: 8,
        国: 6,
        金: 6,
        車: 8,
        側: 6,
        人: 6,
        私: 9,
        油: 7,
        海: 5,
        時: 6,
        道: 7,
        何: 6,
        今: 5,
        家: 4,
        彼: 6,
        誰: 6,
        侍: 9,
        船: 6,
        様: 6,
        全国: 9,
        外国: 9,
        国内: 9,
        先生: 8,
        電車: 8,
        日本: 7,
        空気: 7,
        天気: 7,
        言語: 7,
        英語: 6,
        言葉: 8,
        毎回: 8,
        毎日: 10,
        時々: 10,
        建物: 10,
        一番: 9,
        医者: 6,
        家族: 8,
        彼女: 8,
        写真: 9,
        絶対: 8,
        場所: 7,
        両親: 10,
        文章: 9,
        旅行: 8,
        弁護士: 10,
        飛行機: 9,
        都市: 7,
        授業: 8,
        携帯: 8,
        法律: 10,
        教科書: 11,
        会社: 8,
        一年: 9,
        月: 7,
        大学: 9,
        現在: 8,
        放送: 8,
        号: 5,
        東京: 9,
        世界: 7,
        名前: 7,
        出口: 9,
        女子: 7,
        火山: 7,
        刀: 8,
        一日: 11,
        時間: 8,
        上: 4,
        中: 6,
        点: 5,
        万: 5,
        仕事: 9,
        人間: 8,
        自分: 7,
        僕: 6,
        最近: 8,
        見る: 6,
        見える: 7,
        古い: 7,
        お母さん: 9,
        お父さん: 9,
        上手い: 6,
        止まる: 8,
        泣く: 6,
        必ず: 10,
        買う: 5,
        買った: 7,
        長い: 7,
        良い: 5,
        女の子: 10,
        男の子: 11,
        言う: 4,
        笑う: 7,
        答え: 7,
        乗る: 6,
        始める: 10,
        始めて: 10,
        始まる: 10,
        優しい: 10,
        聞いた: 7,
        知っている: 11,
        知った: 8,
        食べる: 8,
        使う: 8,
        使った: 10,
        使っている: 13,
        持つ: 7,
        持っている: 10,
        行く: 5,
        悲しい: 10,
        次の: 9,
        歩く: 7,
        泳ぐ: 7,
        走る: 9,
        遠い: 6,
        厳しい: 10,
        近い: 8,
        終わる: 7,
        最高の: 10,
        悪い: 7,
        短い: 9,
        偉大な: 8,
        その後: 9,
        行う: 8,
        正しい: 10,
        入り口: 10,
        丸い: 7,
        立つ: 7,
        立てる: 8,
        大いに: 7,
        小さい: 9,
        止める: 8,
        大きい: 7,
        大した: 10,
        入れる: 7,
        入る: 7,
        下がる: 8,
        下げる: 8,
        上がる: 7,
        上げる: 7,
        一つ: 9,
        違う: 9
      };
      keystrokes =
        typeof japanese_words[word] === "undefined" ? 0 : japanese_words[word];
      break;
    case "kor": // korean
      // instead of individual characters, we just take a look at the whole word for keystrokes calculation
      // this time keystrokes aren't added up (from above string length) but replaced/overwritten
      let korean_words = {
        것: 3,
        하다: 4,
        있다: 6,
        되다: 5,
        수: 2,
        나: 2,
        그: 2,
        없다: 6,
        않다: 6,
        사람: 5,
        우리: 4,
        이: 2,
        아니다: 6,
        보다: 4,
        등: 3,
        때: 3,
        거: 2,
        같다: 5,
        주다: 4,
        대하다: 6,
        가다: 4,
        년: 3,
        한: 3,
        말: 3,
        일: 3,
        때문: 6,
        말하다: 7,
        위하다: 7,
        그러나: 6,
        오다: 4,
        알다: 5,
        씨: 3,
        그렇다: 7,
        크다: 4,
        또: 3,
        사회: 5,
        많다: 6,
        안: 3,
        좋다: 5,
        더: 2,
        받다: 5,
        그것: 5,
        집: 3,
        나오다: 6,
        따르다: 7,
        그리고: 6,
        문제: 5,
        그런: 5,
        살다: 5,
        저: 2,
        못하다: 7,
        생각하다: 10,
        모르다: 6,
        속: 3,
        만들다: 8,
        데: 2,
        두: 2,
        앞: 3,
        경우: 5,
        중: 3,
        어떤: 6,
        잘: 3,
        그녀: 4,
        먹다: 5,
        자신: 5,
        문화: 6,
        원: 4,
        생각: 6,
        어떻다: 8,
        명: 3,
        통하다: 7,
        그러다: 6,
        소리: 4,
        다시: 4,
        다른: 5,
        이런: 5,
        여자: 4,
        개: 2,
        정도: 5,
        뒤: 3,
        듣다: 5,
        다: 2,
        좀: 3,
        들다: 5,
        싶다: 5,
        보이다: 6,
        가지다: 6,
        함께: 6,
        아이: 4,
        지나다: 6,
        많이: 6,
        시간: 5,
        너: 2,
        인간: 6,
        사실: 5,
        나다: 4,
        이렇다: 7,
        어머니: 6,
        눈: 3,
        뭐: 3,
        점: 3,
        의하다: 7,
        시대: 4,
        다음: 5,
        이러하다: 8,
        누구: 4,
        전: 3,
        곳: 3,
        여러: 4,
        하나: 4,
        세계: 5,
        버리다: 6,
        위: 3,
        운동: 6,
        퍼센트: 7,
        학교: 5,
        자기: 4,
        가장: 5,
        대통령: 8,
        가지: 4,
        시작하다: 9,
        바로: 4,
        어느: 4,
        그래서: 6,
        무엇: 5,
        정부: 5,
        모든: 5,
        번: 3,
        그거: 4,
        돈: 3,
        국가: 5,
        그런데: 7,
        날: 3,
        여기: 4,
        모두: 4,
        여성: 5,
        친구: 5,
        마음: 5,
        후: 2,
        놓다: 5,
        관계: 7,
        아버지: 6,
        남자: 5,
        어디: 4,
        몸: 3,
        얼굴: 6,
        들어가다: 9,
        왜: 3,
        나타나다: 8,
        말다: 5,
        지역: 5,
        다르다: 6,
        모습: 5,
        물: 3,
        만나다: 7,
        내다: 4,
        쓰다: 5,
        이것: 5,
        없이: 6,
        이번: 5,
        길: 3,
        생활: 7,
        지금: 5,
        뿐: 4,
        사이: 4,
        방법: 6,
        새롭다: 7,
        우리나라: 8,
        앉다: 6,
        처음: 5,
        손: 3,
        몇: 3,
        그때: 5,
        과정: 6,
        삶: 4,
        갖다: 5,
        찾다: 5,
        특히: 5,
        시: 2,
        이상: 5,
        나가다: 6,
        이야기: 6,
        교육: 5,
        사다: 4,
        경제: 5,
        아직: 5,
        잡다: 5,
        같이: 5,
        선생님: 9,
        예술: 6,
        서다: 4,
        못: 3,
        역사: 5,
        읽다: 6,
        이제: 4,
        결과: 6,
        내용: 5,
        물론: 6,
        동안: 6,
        책: 3
      };
      keystrokes =
        typeof korean_words[word] === "undefined" ? 0 : korean_words[word];
      break;
    default:
      throw new Error('language "' + ISO_639_2 + '" not supported');
  }

  return keystrokes;
};

let more = () => {};

module.exports = { analyze, more };

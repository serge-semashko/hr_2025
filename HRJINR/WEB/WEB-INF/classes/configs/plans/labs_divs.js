/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

[lhep divs]
      var topdivs = [
        { 
          color_hsv: [0,0.8,1],
          pname: "Рук.", pcode: 101000, subdivs: {} },
        {
          color_hsv: [0,0.8,1],
          pname: "Гр. Сов. и К.",
          pcode: 102000,
          subdivs: {},
        },
        {
          color_hsv: [16,1,1],
          pname: "СИСТ",
          pcode: 103000,
          subdivs: {},
        },
        {
          color_hsv: [16,0.6,1],
          pname: "ИЭТО",
          pcode: 189000,
          subdivs: {
            189003: {color_hsv: [16,0.6,1], pname: "Группа №3" },
            189004: {color_hsv: [16,0.6,1], pname: "Группа №4" },
            189002: {color_hsv: [16,0.6,1], pname: "Группа №2" },
            189001: {color_hsv: [16,0.6,1], pname: "Группа №1" },
          },
        },
        {
          color_hsv: [338,1,1],
          pname: "АХП",
          pcode: 190000,
          subdivs: {
            192000: {color_hsv: [338,1,1], pname: "Х.O." },
            191000: {color_hsv: [338,1,1], pname: "Адм. бюро" },
          },
        },
        {
          color_hsv: [347,0.5,1],
          pname: "ПФБ",
          pcode: 195000,
          subdivs: {
              
            195003: {color_hsv: [347,0.5,1], pname: "Группа №3" },
            195002: {color_hsv: [347,0.5,1], pname: "Группа №2" },
            195001: {color_hsv: [347,0.5,1], pname: "Группа №1" },
          },
        },

        {
          color_hsv: [80,1,1],
          pname: "Отд.№1",
          show: true,
          pcode: 110000,
          subdivs: {
            111000: {color_hsv: [70,1,1], pname: "НЭОУС" },
            112000: {color_hsv: [70,0.8,0.8], pname: "НЭОИФПУ" },
            113000: {color_hsv: [70,0.4,1], pname: "НТОП" },
            114000: {color_hsv: [90,1,1], pname: "НЭОИКН" },
            115000: {color_hsv: [90,0.8,0.8], pname: "НЭОРС" },
            116000: {color_hsv: [90,0.4,1], pname: "НИОСЭН" },
            117000: {color_hsv: [135,1,1], pname: "НИКО" },
            125000: {color_hsv: [135,0.8,0.8], pname: "ДСН" },
            126000: {color_hsv: [135,0.4,1], pname: "НЭСОП" },
            129000: {color_hsv: [165,1,1], pname: "НЭОСМТ" }
          },
        },
        {color_hsv: [195,1,1],
          pname: "Отд.№2",
          pcode: 120000,
          show: true,
          subdivs: {
            122000: {color_hsv: [195,1,1], pname: "НЭОФТИ" },
            123000: {color_hsv: [195,0.75,1], pname: "НЭОСФМС" },
            124000: {color_hsv: [195,0.55,1], pname: "СФСКЯ" },
            127000: {color_hsv: [210,0.2,1], pname: "НЭОТиМПП" },
          },
        },
        {color_hsv: [245,1,1],
          pname: "Отд.№3",
          show: true,
          pcode: 130000,
          subdivs: {
            135000: {color_hsv: [245,1,1], pname: "НЭОФСТИ" },
            121000: {color_hsv: [245,0.75,1], pname: "НЭОMД" },
            136000: {color_hsv: [245,0.55,1], pname: "НЭОССАиРП" },
            137000: {color_hsv: [245,0.2,1], pname: "НЭОБМ" },
          },
        },
        {color_hsv: [270,1,1],
          pname: "Отд.№4",
          show: true,
          pcode: 140000,
          subdivs: {
            142000: {color_hsv: [270,1,1], pname: "НЭОФТИ  LHC" },
            134000: {color_hsv: [270,0.75,1], pname: "Сф на АТЛАС" },
            141000: {color_hsv: [270,0.55,1], pname: "НЭОФТИ  RHIC" },
            132000: {color_hsv: [270,0.2,1], pname: "НЭОФ на CMS" },
          },
        },
        {color_hsv: [300,1,1],
          pname: "Отд.№5",
          show: true,
          pcode: 150000,
          subdivs: {
            157000: {color_hsv: [300,1,1], pname: "СК" },
            156000: {color_hsv: [300,0.75,1], pname: "СРС" },
            158000: {color_hsv: [300,0.55,1], pname: "НМОКТС" },
            151000: {color_hsv: [300,0.2,1], pname: "НЭОАФИ" },
          },
        },
        {color_hsv: [31,1,1],
          pname: "Отд.№6",
          show: true,
          pcode: 170000,
          subdivs: {
            172000: {color_hsv: [31,1,1], pname: "ЦОЭП" },
            171000: {color_hsv: [31,0.75,0.8], pname: "КО" },
            176000: {color_hsv: [31,0.4,1], pname: "САСУТП ЛФВЭ" },
            170010: {color_hsv: [31,0.2,1], pname: "ГВвЭОиРД" },
          },
        },
        {color_hsv: [45,1,1], pname: "ПKO", pcode: 175000, subdivs: {} }
      ];
      var ocnt = 0;
      for (tdiv in topdivs) {
        ocnt += 1;
        if (topdivs[tdiv].pname.indexOf("Отд.") > -1) {
          topdivs[tdiv].subcnt = Object.keys(topdivs[tdiv].subdivs).length;
          
          ocnt += topdivs[tdiv].subcnt;
        }
      }
[end]
[lit divs]
    var top_divs = [{
            color_rgb: [128, 128, 0]
            , pname: "Руководство"
            , shortname: ""
            , pcode: 601000
            , subdivs: {}
        , }
        , {
            color_rgb: [0, 255, 255]
            , pname: "Сектор ученого секретаря"
            , shortname: ""
            , pcode: 609000
            , subdivs: {}
        , }
        , {
            color_rgb: [128, 0, 128]
            , pname: "Группа по делопроизводству, кадрам и материально-техническому снабжению"
            , shortname: ""
            , pcode: 606000
            , subdivs: {}
        , }
        , {
            color_rgb: [255, 0, 0]
            , pname: "Научный отдел вычислительной физики"
            , shortname: ""
            , pcode: 607000
            , subdivs: {
                607010: {
                    color_rgb: [255, 0, 0]
                    , pname: "Сектор №1 методов моделирования физических процессов и анализа данных наблюдений"
                }
                , 607020: {
                    color_rgb: [255, 0, 0]
                    , pname: "Сектор №2 методов моделирования нелинейных систем"
                }
                , 607030: {
                    color_rgb: [255, 0, 0]
                    , pname: "Сектор №3 методов решения задач математической физики"
                }
                , 607040: {
                    color_rgb: [255, 0, 0]
                    , pname: "Сектор №4 расчетов сложных физических систем"
                }
                , 607050: {
                    color_rgb: [255, 0, 0]
                    , pname: "Сектор №5 алгебраических и квантовых вычислений"
                }
            , }
        , }
        , {
            color_rgb: [0, 255, 0]
            , pname: "Научно-технический отдел внешних коммуникаций и распределенных информационных систем"
            , shortname: ""
            , pcode: 602000
            , subdivs: {
                602010: {
                    color_rgb: [0, 255, 0]
                    , pname: "Сектор №1 распределенных систем"
                }
                , 602050: {
                    color_rgb: [0, 255, 0]
                    , pname: "Сектор №2 гетерогенных вычислений и квантовой информатики"
                }
                , 602020: {
                    color_rgb: [0, 255, 0]
                    , pname: "Сектор №2 программных серверов и управляющих ЭВМ"
                }
                , 602030: {
                    color_rgb: [0, 255, 0]
                    , pname: "Сектор №3 распределенных информационных систем и баз данных"
                }
                , 634000: {
                    color_rgb: [0, 255, 0]
                    , pname: "Сектор №4 развития и сопровождения административных информационных систем"
                }
            , }
        , }
        , {
            color_rgb: [255, 0, 255]
            , pname: "Научно-технический отдел программного и информационного обеспечения"
            , shortname: ""
            , pcode: 608000
            , subdivs: {
                608050: {
                    color_rgb: [255, 0, 255]
                    , pname: "Группа автоматизированных систем управления"
                }
                , 608010: {
                    color_rgb: [255, 0, 255]
                    , pname: "Сектор №1 сопровождения центральных информационных серверов ОИЯИ и средств презентаций"
                }
                , 608020: {
                    color_rgb: [255, 0, 255]
                    , pname: "Сектор №2 разработки математического обеспечения на базе больших программных комплексов и средств визуализации данных"
                }
                , 608030: {
                    color_rgb: [255, 0, 255]
                    , pname: "Сектор №3 развития и стандартизации прикладного программного обеспечения"
                }
                , 608040: {
                    color_rgb: [255, 0, 255]
                    , pname: "Сектор №4 распределенных систем реального времени"
                }
            , }
        , }
        , {
            color_rgb: [128, 0, 128]
            , pname: "Отдел производственно-технического и хозяйственного обслуживания"
            , shortname: ""
            , pcode: 643000
            , subdivs: {
                643001: {
                    color_rgb: [128, 0, 128]
                    , pname: "Группа №1 обслуживания"
                }
                , 643002: {
                    color_rgb: [128, 0, 128]
                    , pname: "Группа №2 по делопроизводству и кадрам"
                }
                , 643003: {
                    color_rgb: [128, 0, 128]
                    , pname: "Группа №3 ремонта"
                }
                , 643004: {
                    color_rgb: [128, 0, 128]
                    , pname: "Группа №4 материально-технического снабжения"
                }
            , }
        , }
        , {
            color_rgb: [0, 0, 255]
            , pname: "Инженерно-технологический отдел"
            , shortname: ""
            , pcode: 613000
            , subdivs: {
                613004: {
                    color_rgb: [0, 0, 255]
                    , pname: "Группа № 2 технической поддержки серверов и компьютерного парка ЛИТ"
                }
                , 613003: {
                    color_rgb: [0, 0, 255]
                    , pname: "Группа № 3 эксплуатации технологических систем"
                }
                , 613001: {
                    color_rgb: [0, 0, 255]
                    , pname: "Группа №1 электротехнологическая"
                }
                , 613010: {
                    color_rgb: [0, 0, 255]
                    , pname: "Сектор развития и эксплуатации сетевой инфраструктуры ОИЯИ"
                }
            , }
        , }]

[end]
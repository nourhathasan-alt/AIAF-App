export interface Employee {
  eid: number; fn: string; ln: string; email: string; phone: string; dept: string; pos: string;
  type: 'full_time' | 'part_time'; status: 'active' | 'terminated'; hired: string; ended: string | null;
}
export interface Department { name: string; code: string }

export const SNAPSHOT_DATE = '2026-11-03';

export const DEPARTMENTS: Department[] = [{"name":"Administration","code":"Adm"},{"name":"Construction","code":"con"},{"name":"Customer Success","code":"cus"},{"name":"Finance","code":"Fin"},{"name":"HSE","code":"HSE"},{"name":"Human Resources","code":"Hum"},{"name":"IT","code":"IT"},{"name":"Marketing","code":"Mar"},{"name":"Production","code":"Pro"},{"name":"Quality","code":"Qua"},{"name":"Sales","code":"Sal"},{"name":"Warehouse","code":"War"}];

export const EMPLOYEES: Employee[] = [
  {"eid":1012,"fn":"Fabien Test","ln":"Barthez 1234","email":"fabien.barthez@bjorkas.no","phone":"95183323","dept":"Construction","pos":"Construction Worker","type":"full_time","status":"active","hired":"2020-05-06","ended":null},
  {"eid":1014,"fn":"David R. 22","ln":"Beckham","email":"david.beckham@bjorkas.com","phone":"22555522","dept":"Administration","pos":"Warehouse Worker","type":"full_time","status":"terminated","hired":"2013-01-31","ended":null},
  {"eid":1048,"fn":"Henning test","ln":"Berg","email":"henning.berg@bjorkas.com","phone":"12853298","dept":"Customer Success","pos":"Customer Success Manager","type":"full_time","status":"terminated","hired":"2019-01-17","ended":"2026-11-26"},
  {"eid":1039,"fn":"Ida 22","ln":"Berg","email":"ida.berg@bjorkas.com","phone":"87332691","dept":"Finance","pos":"Finance Analyst","type":"full_time","status":"active","hired":"2010-04-23","ended":null},
  {"eid":1038,"fn":"Emma Test","ln":"Berget","email":"emma.berget@bjorkas.com","phone":"41688372","dept":"Administration","pos":"Managing Director","type":"full_time","status":"active","hired":"2013-08-01","ended":null},
  {"eid":1010,"fn":"George R","ln":"Best","email":"george.best@bjorkas.com","phone":"46486614","dept":"Administration","pos":"Receptionist","type":"full_time","status":"active","hired":"2017-08-09","ended":null},
  {"eid":1021,"fn":"Unni","ln":"Birkeland","email":"unni.birkeland@bjorkas.com","phone":"93040588","dept":"Production","pos":"Production Manager","type":"full_time","status":"active","hired":"2015-09-23","ended":null},
  {"eid":1018,"fn":"Eric-André","ln":"Cantona","email":"eric.cantona@bjorkas.com","phone":"59058983","dept":"IT","pos":"IT Developer","type":"full_time","status":"active","hired":"2021-12-02","ended":null},
  {"eid":1032,"fn":"Luke","ln":"Chadwick","email":"luke.chadwick@bjorkas.com","phone":"523523523","dept":"Sales","pos":"Temp Worker","type":"full_time","status":"active","hired":"2022-05-05","ended":null},
  {"eid":1028,"fn":"Johan","ln":"Cruyff","email":"johan.cruyff@bjorkas.com","phone":"50518968","dept":"HSE","pos":"Safety Officer","type":"full_time","status":"active","hired":"2007-06-15","ended":null},
  {"eid":1033,"fn":"Ingrid","ln":"Dahl","email":"ingrid.dahl@bjorkas.com","phone":"93040588","dept":"Human Resources","pos":"HR Manager","type":"full_time","status":"active","hired":"2018-04-11","ended":null},
  {"eid":1031,"fn":"Emilie","ln":"Davidsen","email":"emilie.davidsen@bjorkas.com","phone":"45272480","dept":"Finance","pos":"CFO","type":"full_time","status":"active","hired":"2016-11-03","ended":null},
  {"eid":1029,"fn":"Maja","ln":"Eriksen","email":"maja.eriksen@bjorkas.com","phone":"42057614","dept":"Production","pos":"Production Operator","type":"full_time","status":"active","hired":"2019-01-17","ended":null},
  {"eid":1005,"fn":"Jostein","ln":"Flo","email":"jostein.flo@bjorkas.com","phone":"72957331","dept":"Human Resources","pos":"HR Specialist","type":"full_time","status":"active","hired":"2022-05-05","ended":null},
  {"eid":1004,"fn":"Diego","ln":"Forlan","email":"diego.forlan@bjorkas.com","phone":"42352435","dept":"Construction","pos":"Site Manager","type":"full_time","status":"active","hired":"2021-10-07","ended":null},
  {"eid":1041,"fn":"Sofie","ln":"Hansen","email":"sofie.hansen@bjorkas.com","phone":"46613086","dept":"Construction","pos":"Machine Operator","type":"full_time","status":"active","hired":"2017-09-27","ended":null},
  {"eid":1026,"fn":"Siri","ln":"Hatlevoll","email":"siri.hatlevoll@bjorkas.com","phone":"98754312","dept":"IT","pos":"CTO","type":"full_time","status":"active","hired":"2021-01-01","ended":null},
  {"eid":1016,"fn":"Elise","ln":"Haugen","email":"elise.haugen@bjorkas.com","phone":"41047277","dept":"Construction","pos":"Construction Worker","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1043,"fn":"Sara","ln":"Holm","email":"sara.holm@bjorkas.com","phone":"59793680","dept":"IT","pos":"IT Developer","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1015,"fn":"Isak","ln":"Håland","email":"isak.haaland@bjorkas.com","phone":"47151706","dept":"Warehouse","pos":"Warehouse Worker","type":"full_time","status":"active","hired":"2017-07-19","ended":null},
  {"eid":1019,"fn":"Zlatan","ln":"Ibrahimović","email":"zlatan.ibrahimovic@bjorkas.com","phone":"82134393","dept":"Customer Success","pos":"Customer Support Lead","type":"full_time","status":"active","hired":"2012-06-15","ended":null},
  {"eid":1009,"fn":"Andrés","ln":"Iniesta","email":"andres.iniesta@bjorkas.com","phone":"71189422","dept":"HSE","pos":"HSE Coordinator","type":"full_time","status":"active","hired":"2017-05-05","ended":null},
  {"eid":1046,"fn":"Dennis","ln":"Irwin","email":"dennis.irwin@bjorkas.com","phone":"22225555","dept":"HSE","pos":"HSE Manager","type":"full_time","status":"active","hired":"2003-05-22","ended":null},
  {"eid":1017,"fn":"Camilla","ln":"Jensen","email":"camilla.jensen@bjorkas.com","phone":"46638546","dept":"Sales","pos":"Sales Representative","type":"full_time","status":"active","hired":"2021-10-07","ended":null},
  {"eid":1000,"fn":"Julie","ln":"Jensen","email":"julie.jensen@bjorkas.com","phone":"44714944","dept":"Warehouse","pos":"Warehouse Worker","type":"part_time","status":"active","hired":"2020-01-29","ended":null},
  {"eid":1025,"fn":"Ronny","ln":"Johnsen","email":"ronny.johnsen@bjorkas.com","phone":"12451324","dept":"Finance","pos":"Auditor","type":"full_time","status":"active","hired":"2017-08-30","ended":null},
  {"eid":1030,"fn":"Roy","ln":"Keane","email":"roy.keane@bjorkas.com","phone":"98765431","dept":"Warehouse","pos":"Terminal Worker","type":"full_time","status":"active","hired":"2008-10-21","ended":null},
  {"eid":1044,"fn":"Lucas","ln":"Kvamme","email":"lucas.kvamme@bjorkas.com","phone":"40557252","dept":"Quality","pos":"QA Manager","type":"full_time","status":"active","hired":"2010-04-23","ended":null},
  {"eid":1036,"fn":"Sven","ln":"Larsen","email":"sven.larsen@bjorkas.com","phone":"46613086","dept":"Warehouse","pos":"Warehouse Manager","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1023,"fn":"Michael","ln":"Laudrup","email":"michael.laudrup@bjorkas.com","phone":"56955078","dept":"Marketing","pos":"Content Marketing Manager","type":"full_time","status":"active","hired":"2008-10-21","ended":null},
  {"eid":1001,"fn":"Freddie","ln":"Ljungberg","email":"freddie.ljungberg@bjorkas.com","phone":"50561166","dept":"Quality","pos":"Quality Analyst","type":"full_time","status":"active","hired":"2008-10-21","ended":null},
  {"eid":1042,"fn":"Kristine","ln":"Lund","email":"kristine.lund@bjorkas.com","phone":"55434580","dept":"Sales","pos":"Business Developer","type":"full_time","status":"active","hired":"2010-04-23","ended":null},
  {"eid":1035,"fn":"Paolo","ln":"Maldini","email":"paolo.maldini@bjorkas.com","phone":"85131142","dept":"Marketing","pos":"Marketing Analyst","type":"full_time","status":"active","hired":"2021-01-01","ended":null},
  {"eid":1024,"fn":"Oskar","ln":"Nilsen","email":"oskar.nilsen@bjorkas.com","phone":"41688372","dept":"Finance","pos":"Controller","type":"full_time","status":"active","hired":"2012-06-15","ended":null},
  {"eid":1034,"fn":"Silje","ln":"Nilsen","email":"silje.nilsen@bjorkas.com","phone":"98241157","dept":"Sales","pos":"Account Executive","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1002,"fn":"Thomas","ln":"Olstad","email":"thomas.olstad@bjorkas.com","phone":"93040588","dept":"Warehouse","pos":"Inbound/Outbound Supervisor","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1007,"fn":"Olivia","ln":"Sagstad","email":"olivia.sagstad@bjorkas.com","phone":"46613086","dept":"Warehouse","pos":"Warehouse Worker","type":"full_time","status":"active","hired":"2015-08-20","ended":null},
  {"eid":1013,"fn":"Mohamed","ln":"Salah","email":"mohamed.salagh@bjorkas.com","phone":"95183323","dept":"Sales","pos":"Business Developer","type":"full_time","status":"active","hired":"2007-06-15","ended":null},
  {"eid":1040,"fn":"Peter","ln":"Schmeichel","email":"peter.schmeichel@bjorkas.com","phone":"3245235235","dept":"Production","pos":"Production Operator","type":"full_time","status":"active","hired":"2010-05-13","ended":null},
  {"eid":1022,"fn":"Paul","ln":"Scholes","email":"paul.scholes@bjorkas.com","phone":"562818244","dept":"Warehouse","pos":"Warehouse Worker","type":"full_time","status":"active","hired":"2003-05-14","ended":null},
  {"eid":1037,"fn":"Alan","ln":"Smith","email":"alan.smith@bjorkas.com","phone":"23985895","dept":"Marketing","pos":"Head of Marketing","type":"full_time","status":"active","hired":"2020-01-29","ended":null},
  {"eid":1027,"fn":"Thea","ln":"Solberg","email":"thea.solberg@bjorkas.com","phone":"46328732","dept":"Production","pos":"Production Operator","type":"full_time","status":"active","hired":"2009-03-10","ended":null},
  {"eid":1049,"fn":"Ole Gunnar","ln":"Solskjær","email":"ole.gunnar.solskjær@bjorkas.com","phone":"44846651","dept":"Human Resources","pos":"HR Coordinator","type":"full_time","status":"active","hired":"2008-10-21","ended":null},
  {"eid":1006,"fn":"Hanna","ln":"Strand","email":"hanna.strand@bjorkas.com","phone":"92136659","dept":"IT","pos":"IT Support Specialist","type":"full_time","status":"active","hired":"2021-10-07","ended":null},
  {"eid":1045,"fn":"Nora","ln":"Ulriksen","email":"nora.ulriksen@bjorkas.com","phone":"40557252","dept":"Administration","pos":"CCO","type":"full_time","status":"active","hired":"2017-01-01","ended":null},
  {"eid":1011,"fn":"Ruud","ln":"Van Nistelrooy","email":"ruud.vannistelrooy@bjorkas.com","phone":"99883311","dept":"Sales","pos":"Sales Associate","type":"full_time","status":"active","hired":"2021-09-09","ended":null},
  {"eid":1003,"fn":"Juan Sebastian","ln":"Veron","email":"juansebastian.veron@bjorkas.com","phone":"450332211","dept":"Production","pos":"Production Operator","type":"full_time","status":"active","hired":"2019-06-06","ended":null},
  {"eid":1020,"fn":"Nora","ln":"Wiik","email":"nora.wiik@bjorkas.com","phone":"45272480","dept":"IT","pos":"IT Developer","type":"full_time","status":"active","hired":"2017-05-05","ended":null},
  {"eid":1047,"fn":"Zinedine","ln":"Zidane","email":"zinedine.zidane@bjorkas.com","phone":"97703898","dept":"Customer Success","pos":"Customer Success Specialist","type":"full_time","status":"active","hired":"2003-05-14","ended":null},
  {"eid":1008,"fn":"Marco","ln":"van Basten","email":"marco.van.basten@bjorkas.com","phone":"95735783","dept":"Quality","pos":"Quality Inspector","type":"full_time","status":"active","hired":"2010-04-23","ended":null}
];

export const fullName = (e: Employee) => `${e.fn} ${e.ln}`;
export const fmtDate = (d: string | null) => (d ? d.split('-').reverse().join('.') : '—');

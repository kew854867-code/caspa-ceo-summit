const B='assets/spk/';
const F=[
['Gary Wang','President','CASPA \'25–\'26','x'],
['Jimmy Cheng','President','CASPA \'26–\'27','IMG_4704_1779822235845-BaAA3PBK.png'],
['Lip-Bu Tan','CEO','Intel','2C524BF7-CBB4-419F-A97E-A9E39B687AA3_1779086898716-AQqWVzLv.png',1],
['Chenming Hu','Father of the 3D Transistor','UC Berkeley','55464DD5-0037-4AC7-8E91-D403F5C100D3_1779121957187-C8EAmvOY.png',1],
['Andrew Feldman','CEO','Cerebras','F3EF3946-5B5D-400F-BCA9-E0F42CD64866_1783751307115-d6sA3Ncy.png'],
['Sassine Ghazi','CEO','Synopsys','92FE495A-00F9-44B1-AF46-A088FA81D57D_1780293398458-DqRsGOBa.png'],
['Dylan Patel','CEO','SemiAnalysis','B3D57552-05EE-404E-B8B5-D6A3F1C08E7D_1780946493570-BeJ95nFB.jpeg'],
['Rodrigo Liang','CEO','SambaNova','D5D33C40-3802-45DF-83B8-37A68C8E529B_1779121957187--7L-MwDc.png'],
['Ajit Manocha','CEO','SEMI','A460DB3B-9093-4E84-94AA-A6C8ADEC051A_1779085584552-CtYi2vwB.png']];
const M=[
['Rajiv Khemani','Executive Chairman, Upscale AI','CEO, Velaura AI','x'],
['Avi Shetty','Vice President','Solidigm','x'],
['Albert Kim','Head','Samsung Ventures America','1F1F5885-6A94-4D7F-B33E-395286947D01_1783637006894-jfE0rzFn.png'],
['Albert Zhang','CEO','Silith','6AA5EE25-3C6E-4D4D-8475-B14C351175A2_1784656063216-Be3_jcdx.png'],
['Andrew Tan','Managing Director','Salience Capital','B143CC9B-2159-44F4-BD32-A57E80C2597F_1785812065542-ht_ZUMy4.png'],
['Ankur Gupta','Head of EDA IC','Siemens','09BF73E0-26BD-4EE9-B5DE-932E07F44234_1785518260658-D87rE9eN.png'],
['Anna Goldie','CEO','Ricursive Intelligence','36B0412A-4419-4BD1-BA4D-E732DAFB6F8A_1786950348557-CrJVsQyF.png'],
['Bill Brennan','CEO','Credo','96F4B38E-48A3-44B1-886A-627494ED3818_1788494304576--qJo65s5.png'],
['David Lam','CEO, Multibeam','Founder, Lam Research','407E990F-0E32-4B6C-882F-AD61B64E22A5_1778915933700-BzQLtfSr.png'],
['Faraj Aalaei','CEO','Cognichip','51140AE6-E8C7-41C8-9BAB-DFA02317B765_1783637006894-mUpxTQdD.png'],
['Faris Sbahi','CEO','Normal Computing','13D263ED-E081-4D81-8948-2DE6A9C04C9D_1785518260658-BaCjRU6Y.png'],
['Gavin Uberti','CEO','Etched','267ED105-AAEE-45C3-8EE0-3E068D0B3B48_1782695597644-BCEmIS7V.png'],
['Hao Zhong','CEO','ScaleFlux','636BA633-15E1-466C-9DF2-4DAB82F7F430_1785997200645-SbIsWo05.png'],
['Hong Hou','CEO','Semtech','D68D902F-41E0-4CC1-BC62-B773BAA35122_1785860935821-PalTcaJ0.png'],
['Irving Tan','CEO','WD','F1A23EB4-C629-4C0D-9BA2-5B670A376C8B_1780563808959-CMCdes1q.png'],
['Jodi Shelton','CEO','Global Semiconductor Alliance','019610F7-BA06-4F10-B334-E098B5FFDA07_1786154700547-DPCkEprh.png'],
['Khurram Ismail','CPO','Sandisk','DF087C9C-2FD8-4DA8-981C-6CACE372E69F_1783024768619-CeftgjJk.png'],
['Krishna Rangasayee','CEO','Sima.ai','147934E5-D9D9-425F-B01A-A3E1C83DAE03_1786154700547-CbmMUjej.png'],
['Mark Wade','CEO','Ayar Labs','0886A067-9919-4756-BAB4-6F8A0421AF07_1783024768619-D4y6esE6.png'],
['Mary Ellen Randall','President & CEO','IEEE','IMG_6572_1787074080316-vCPLV-Nj.jpeg'],
['Melton Chang','Executive Vice President','Schneider Electric Power Systems','493_1784912725098-BHPl68Xa.jpeg'],
['Michael Hurlston','CEO','Lumentum','D4E3FEF0-CB1F-4CFC-92C8-FBE2423D3026_1778915933700-DV06OE13.png'],
['Michael Xie','President & Co-founder','Fortinet','278D7D17-9372-4E07-957C-EC5DCDA6FBA7_1780116650886-BZE2BXhe.png'],
['Naveen Rao','CEO','Unconventional AI','675C4E53-308C-478B-939B-5DCADE397C7F_1779175010186-DaP-4cQc.png'],
['Raghib Hussain','CEO','Altera','AE1B747A-FB29-42E3-B787-F25E78086DCC_1778915933700-PcKO2BQf.png'],
['Shahin Farshchi','General Partner','Lux Capital','48D1A2B2-3D61-4F91-9FE7-400671EA43B3_1784036585053-CDUNcxQL.png'],
['Sid Sheth','CEO','D-Matrix','B17E97FA-FCA9-4F06-86B0-FF3AE511025A_1778915933700-DBTitl_t.png'],
['Stacy Rasgon','Managing Director','Bernstein','9091DD4F-D0EF-48BF-AC6E-1DF7283CAA62_1783637006894-C1hlncBP.png'],
['Sunghyun Park','CEO','Rebellions','C462E470-E1A6-4398-87A5-715533D6F533_1782395495008-BEdryp8T.png'],
['Umesh Padval','Managing Partner','Seligman Ventures','DB5817CF-7F94-4B5D-BFC5-9AE571647808_1786154700547-CCnF-4w1.png']];
const ALL=[...F,...M];
const byName=n=>ALL.find(p=>p[0]===n);
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
ALL.forEach(p=>p[3]=slug(p[0])+'.jpg');

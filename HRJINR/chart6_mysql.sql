SELECT CONCAT(sotr.tab_n,':{"cat":"',sotr.category, '","tab":"',sotr.tab_n , '","post":"',sotr.post , '","age":"', 1, '","topdiv":"',sotr.TopParent_Name, '","subtopdiv":"',sotr.subTopParent_Name, '","topdiv_code":',sotr.TopParent_code, ',"subtopdiv_code":',sotr.subTopParent_code, '},') AS desc_sotr_list
FROM sotrudniki sotr
WHERE lab_id = 100000 AND (sotr.datauvolen > current_date OR sotr.datauvolen IS NULL) AND ((sotr.datauvolen > '2024-3-01' OR sotr.datauvolen IS NULL) AND (sotr.okonch_rab > '2024-3-01' OR sotr.okonch_rab IS NULL) AND (sotr.nachalo_rab <'2024-1-01')) ;


SELECT CONCAT('{"pname":"', str.short_name, '","pcode":', str.id, ',"subdivs":{', IFNULL((
SELECT GROUP_CONCAT(str1.id,':{"pname":"',str1.short_name,'"}')
FROM struktura str1
WHERE str1.pid=str.id AND str1.view1=1), ''), '}},') AS div_list
FROM struktura str
WHERE str.pid=100000 AND str.view1=1;


SELECT CONCAT('"',sotr.TopParent_code,'|',sotr.category,'":', SUM(sotr.stavka),',') AS div_cat_cnt
FROM sotrudniki sotr
WHERE lab_id = 100000 AND (sotr.datauvolen > current_date OR sotr.datauvolen IS NULL) AND ((sotr.datauvolen > '2024-3-01' OR sotr.datauvolen IS NULL) AND (sotr.okonch_rab > '2024-3-01' OR sotr.okonch_rab IS NULL) AND (sotr.nachalo_rab <'2024-1-01')) AND sotr.TopParent_code IN (

SELECT id
FROM struktura str
WHERE str.pid=100000 AND str.view1=1)
GROUP BY sotr.category, sotr.TopParent_code UNION
SELECT CONCAT('"',sotr.TopParent_code,'":', SUM(sotr.stavka),',') AS div_cat_cnt
FROM sotrudniki sotr
WHERE lab_id = 100000 AND (sotr.datauvolen > current_date OR sotr.datauvolen IS NULL) AND ((sotr.datauvolen > '2024-3-01' OR sotr.datauvolen IS NULL) AND (sotr.okonch_rab > '2024-3-01' OR sotr.okonch_rab IS NULL) AND (sotr.nachalo_rab <'2024-1-01')) AND sotr.TopParent_code IN (
SELECT id
FROM struktura str
WHERE str.pid=100000 AND str.view1=1)
GROUP BY sotr.TopParent_code ;

SELECT DISTINCT CONCAT(category,'|') AS all_cat
FROM sotrudniki s
WHERE s.lab_id=100000;


SELECT CONCAT('"',sotr.subTopParent_code,'|',sotr.category,'":', SUM(sotr.stavka),',') AS subdiv_cat_cnt
FROM sotrudniki sotr
WHERE lab_id = 100000 AND (sotr.datauvolen > current_date OR sotr.datauvolen IS NULL) AND ((sotr.datauvolen > '2024-3-01' OR sotr.datauvolen IS NULL) AND (sotr.okonch_rab > '2024-3-01' OR sotr.okonch_rab IS NULL) AND (sotr.nachalo_rab <'2024-1-01')) AND sotr.subTopParent_code IN (
SELECT id
FROM struktura str
WHERE str.pid IN (
SELECT id
FROM struktura str
WHERE str.pid=100000 AND str.view1=1) AND str.view1=1)
GROUP BY sotr.category, sotr.subTopParent_code UNION
SELECT CONCAT('"',sotr.subTopParent_code,'":', SUM(sotr.stavka),',') AS subdiv_cat_cnt
FROM sotrudniki sotr
WHERE lab_id = 100000 AND (sotr.datauvolen > current_date OR sotr.datauvolen IS NULL) AND ((sotr.datauvolen > '2024-3-01' OR sotr.datauvolen IS NULL) AND (sotr.okonch_rab > '2024-3-01' OR sotr.okonch_rab IS NULL) AND (sotr.nachalo_rab <'2024-1-01')) AND sotr.subTopParent_code IN (
SELECT id
FROM struktura str
WHERE str.pid IN (
SELECT id
FROM struktura str
WHERE str.pid=100000 AND str.view1=1) AND str.view1=1)
GROUP BY sotr.subTopParent_code ;

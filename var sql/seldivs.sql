SELECT   s.id, s.short_name,
(SELECT GROUP_CONCAT('\n\t',
   id, ' ',short_name
	) FROM  struktura ss WHERE ss.pid = s.id AND ss.view1=1)

FROM struktura s
WHERE s.pid = 100000 AND s.view1=1
ORDER BY s.short_name;


insert users_v2 (kod_fl, tab_n,f,i,o,fio,lab_id, rights,personal_filters ) 
   SELECT person_id,tab_n,f,i,o,fio,(div_code div 100000)*100000 , 
	"personal_place_view,map_view", 
	""
    FROM sotrudniki
    WHERE tab_n=11111111111111
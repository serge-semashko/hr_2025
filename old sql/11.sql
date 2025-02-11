	SELECT concat('["',
            Code  ,'", "',Name_Rasch,'", "' ,Summa,'", "'  ,Ed,'", "'  ,Deistvie,'", "'  ,datebegin,'", "'   ,DateEnd,'", "'    ,Stavka,'"],')  
			FROM [DB_1C_2].[1c8_2].[LHE_Nadbavki]
        where tabn='17914'
		order by datebegin desc;


		select distinct Name_Rasch from [DB_1C_2].[1c8_2].[LHE_Nadbavki]
		where Name_Rasch like '%компенс%';

			SELECT  tabn,  STRING_AGG(CONCAT( ' ', Name_Rasch), ', ')
			FROM [DB_1C_2].[1c8_2].[LHE_Nadbavki] n
			where Name_Rasch like '%уход%' 
            group by tabn
			

    SELECT concat(
	'"',
	trim(tabn),'_',
	month(n.period),'"',
	':',
    sum(rezultat) ,
	','

	)  as json_sum_month_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where ( month(n.period) <= #end_month# and month(n.period) >= #start_month# )
    group by n.Tabn ,month(n.period)
  order by n.Tabn;

    SELECT concat(
	'"',
	trim(tabn),
	'":',
    sum(rezultat) ,
	','

	)  as json_sum_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where ( month(n.period) <= #end_month# and month(n.period) >= #start_month# )
    group by n.Tabn 
  order by n.Tabn;




SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_stimul_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where  ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
    VidRascheta in 
        $INCLUDE tab_reports_chart[stimul entries]
    group by n.Tabn
    ;

SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_fzp_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where 1=1  
        and ( month(n.period) <= #end_month# and month(n.period) >= #start_month# )
        and VidRascheta in 
        $INCLUDE tab_reports_chart[FZP entries]
    group by n.Tabn
    ;
    
SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_bonus_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where  ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
    VidRascheta in 
        $INCLUDE tab_reports_chart[BONUS entries]
    group by n.Tabn
    ;
    SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_quartbonus_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where  ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
    VidRascheta in ('Квартальная премия ЛФВЭ')
    group by n.Tabn
    ;
    
SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_prochee_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where  ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
        VidRascheta in 
        $INCLUDE tab_reports_chart[prochee entries]
    group by n.Tabn
    ;
    SELECT concat(
	tabn,':',
    sum(rezultat) ,
	','
	)  as json_otpusk_1c
    FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n 
    where  ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
        VidRascheta in 
        $INCLUDE tab_reports_chart[otpusk entries]
    group by n.Tabn
    ;
select concat('<tr><td>',VidRascheta, '</td><td class=right>',cast(round(sum(n.Rezultat)/1000,0) as int),'</td></tr>')  as pay_missed_1c  
FROM [DB_1C_2].[1c8_2].[LHE_Nachisleniya#year_add#] n
    where ( month(n.period) <= #end_month# and month(n.period) >= #start_month# ) and
    VidRascheta not in  
        $INCLUDE tab_reports_chart[stimul entries]
    and  VidRascheta not in  
        $INCLUDE tab_reports_chart[FZP entries]
    and  VidRascheta not in  
        $INCLUDE tab_reports_chart[BONUS entries]
    and  VidRascheta not in  
        $INCLUDE tab_reports_chart[otpusk entries]
    and  VidRascheta not in  
         ('Квартальная премия ЛФВЭ')
    and  VidRascheta not in  
        $INCLUDE tab_reports_chart[prochee entries]
    and  VidRascheta not in  
        $INCLUDE tab_reports_chart[otpusk entries]
    and tabn in #sotr_list#    

group by  n.VidRascheta
order by sum(n.Rezultat) desc

;

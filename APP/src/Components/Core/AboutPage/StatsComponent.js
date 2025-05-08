import React, { useEffect, useState } from 'react';
import {apiConnector} from '../../../Services/apiconnector';
import {StatsLink} from '../../../Services/apis';

const AwardsCount = 5;

const StatsComponent = () => {
    const [stats,setStats] = useState([]);
    async function fetchStats() {
        const statsres = await apiConnector('GET',StatsLink.STATS_LINK);
        if(statsres.data.success){
            let data = statsres.data.data;
            console.log(data);
            data.push({
                label:"Awards",
                count:AwardsCount,
            });
            setStats(data);
        }
        // console.log(stats.data);
    }
    useEffect(
        () => {
            fetchStats();
        },[]
    )
  return (
    <div className='text-white grid md:grid-cols-4 grid-cols-2 gap-y-5 justify-between'>
        {
            stats.map((ele,ind) => {
                return (
                    <div key={ind} className='flex flex-col items-center'>
                        <h3 className='text-4xl font-extrabold'>{ele.count}+</h3>
                        <p className='text-richblack-400 font-semibold'>{ele.label}</p>
                    </div>
                )
            })
        }
    </div>
  );
}

export default StatsComponent;

import React, { useEffect, useState, useContext } from 'react';
import classNames from "classnames";
import "../../styles/CurrentWeather.scss";
import axios from 'axios';
import { formatDate } from '../../helpers/date_time';
import Icon from '../Common/Icon';
import { appContext } from './../../providers/AppProvider';
import { format } from 'date-fns';


function CurrentWeather() {

  const currentWeatherClass = classNames("current-weather");
  const { selectedDate } = useContext(appContext);
  const [todayWeather, setTodayWeather] = useState({});

  //get these values from somwhere
  const city = 'Calgary';

  // console.log("here in currentweather!");

  useEffect(() => {

    //make getCurrentWeather API call to backend and pass userID and date with it
    const url = selectedDate ? `/api/weather/${city.toLowerCase()}/${selectedDate}` : `api/weather/${city}`;
    axios
      .get(url)
      .then(res => {
        // console.log(res);
        const { text, icon, date } = res.data.weather;
        setTodayWeather({
          icon,
          text,
          date: date ? date : format(new Date(), 'dd-MM-yyyy')
        });
      })
      .catch(err => console.error(err));

    //insert today weather to daySelection table if it is not there yet

    //use return from axios to set today weather state

  }, [selectedDate]);

  return (
    <div className={currentWeatherClass}>
      <div className='second-box'>
        <Icon
          imgUrl={todayWeather.icon}
          iconSize='x-large'
          iconStyle="padding"
        />
        <p>{todayWeather.text}</p>
      </div>

      <div className='first-box'>
        <div>
          <Icon
            imgUrl='images/icons/selected_date_1.png'
            iconSize='medium'
            iconStyle="padding"
          />
          <p>{todayWeather.date}</p>
        </div>
        <div>
          <Icon
            imgUrl='images/icons/location_1.png'
            iconSize='medium'
            iconStyle="padding"
          />
          <p>{city} </p>
        </div>
      </div>


    </div>
  );
}

export default CurrentWeather;

import React from 'react';
import { SCHEDULE_DATA } from '../constants';

const getActivityColor = (activity: string) => {
  if (activity.includes('Tae')) return 'text-lime-400';
  if (activity.includes('Muay')) return 'text-cyan-400';
  if (activity.includes('Gimnasio')) return 'text-sky-400';
  return 'text-gray-400';
};

export const Schedule: React.FC = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const times = ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];

  return (
    <div 
      className="py-6 md:py-8 mb-4 rounded-xl border border-gray-700/50 shadow-2xl"
      style={{
        backgroundImage: "linear-gradient(rgba(23, 30, 44, 0.95), rgba(23, 30, 44, 0.95)), url('https://images.unsplash.com/photo-1574680096145-f844347f0756?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-cyan-400 tracking-wider">
        HORARIO DE ENTRENAMIENTO
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Morning Schedule */}
        <div className="flex flex-col items-center">
          <h3 className="text-md font-semibold text-white mb-2">Turno Mañana</h3>
          <div className="text-center bg-black/20 rounded-lg p-3 w-full border border-gray-700/50">
            <p className="font-bold text-sky-400">{SCHEDULE_DATA.morning.activity}</p>
            <p className="text-gray-300">{SCHEDULE_DATA.morning.days}</p>
            <p className="text-gray-300">{SCHEDULE_DATA.morning.time}</p>
          </div>
        </div>
        
        {/* Afternoon/Evening Title for Mobile */}
        <h3 className="text-md font-semibold text-center text-white md:hidden">Turno Tarde</h3>
      </div>

      {/* Afternoon Schedule Table */}
      <div className="mt-4 max-w-4xl mx-auto">
        <h3 className="text-md font-semibold text-center text-white mb-3 hidden md:block">Turno Tarde</h3>
        <div className="grid grid-cols-6 gap-1 md:gap-2 text-center text-xs md:text-sm bg-black/20 rounded-lg p-2 border border-gray-700/50">
          {/* Headers */}
          <div className="font-bold"></div>
          {days.map(day => <div key={day} className="font-bold text-orange-400 p-1">{day.toUpperCase().substring(0,3)}</div>)}

          {/* Rows */}
          {times.map(time => (
            <React.Fragment key={time}>
              <div className="font-bold text-orange-400 self-center p-1">{time.replace(' PM', '')}</div>
              {days.map(day => {
                const activity = SCHEDULE_DATA.afternoon[day.toLowerCase()]?.find(item => item.time === time)?.activity || '----';
                return (
                  <div 
                    key={`${day}-${time}`} 
                    className={`p-2 rounded-md ${getActivityColor(activity)} font-semibold flex items-center justify-center min-h-[40px] md:min-h-[48px]`}
                  >
                    {activity}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

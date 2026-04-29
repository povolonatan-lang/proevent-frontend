import React from 'react';
import './ScheduledEvents.css';

const scheduledEventsData = [
    {
        category: "UFC",
        fecha: "9 May.",
        hora: "6:00 PM",
        tv: "",
        evento: "UFC 328: Chimaev vs. Strickland",
        lugar: "Prudential Center, Newark, NJ"
    },
    {
        category: "UFC",
        fecha: "16 May.",
        hora: "6:00 PM",
        tv: "",
        evento: "UFC Fight Night: Allen vs. Costa",
        lugar: "Meta APEX, Las Vegas, NV"
    },
    {
        category: "UFC",
        fecha: "30 May.",
        hora: "5:00 AM",
        tv: "",
        evento: "UFC Fight Night: Song vs. Figueiredo",
        lugar: "Galaxy Arena, Cotai, Macau"
    },
    {
        category: "UFC",
        fecha: "6 Jun.",
        hora: "6:00 PM",
        tv: "",
        evento: "UFC Fight Night: Muhammad vs. Bonfim",
        lugar: "Meta APEX, Las Vegas, NV"
    },
    {
        category: "UFC",
        fecha: "14 Jun.",
        hora: "9:00 PM",
        tv: "",
        evento: "UFC Freedom 250: Topuria vs. Gaethje",
        lugar: "South Lawn of the White House, Washington, DC"
    },
    {
        category: "UFC",
        fecha: "27 Jun.",
        hora: "1:00 PM",
        tv: "",
        evento: "UFC Fight Night: Baku",
        lugar: "Baku Crystal Hall, Baku, Azerbaiyán"
    },
    {
        category: "UFC",
        fecha: "11 Jul.",
        hora: "5:00 PM",
        tv: "",
        evento: "UFC 329",
        lugar: "T-Mobile Arena, Las Vegas, NV"
    },
    {
        category: "UFC",
        fecha: "15 Ago.",
        hora: "6:00 PM",
        tv: "",
        evento: "UFC 330",
        lugar: "Xfinity Mobile Arena, Philadelphia, PA"
    },
    {
        category: "F1",
        fecha: "Jul. 5",
        hora: "11:00 AM",
        tv: "",
        evento: "British GP",
        lugar: "Silverstone Circuit"
    },
    {
        category: "F1",
        fecha: "Jul. 19",
        hora: "10:00 AM",
        tv: "",
        evento: "GP de Bélgica",
        lugar: "Circuit de Spa-Francorchamps"
    },
    {
        category: "F1",
        fecha: "Jul. 26",
        hora: "10:00 AM",
        tv: "",
        evento: "AWS Hungarian GP",
        lugar: "Hungaroring"
    },
    {
        category: "F1",
        fecha: "Ago. 23",
        hora: "10:00 AM",
        tv: "",
        evento: "Heineken Dutch GP",
        lugar: "Circuit Park Zandvoort"
    },
    {
        category: "F1",
        fecha: "Sep. 6",
        hora: "10:00 AM",
        tv: "",
        evento: "Pirelli Italian GP",
        lugar: "Autodromo Nazionale Monza"
    },
    {
        category: "F1",
        fecha: "Sep. 13",
        hora: "10:00 AM",
        tv: "",
        evento: "Tag Heuer Spanish GP",
        lugar: "Madrid, Spain"
    },
    {
        category: "F1",
        fecha: "Sep. 26",
        hora: "8:00 AM",
        tv: "",
        evento: "Qatar Airways Azerbaijan GP",
        lugar: "Baku City Circuit"
    },
    {
        category: "F1",
        fecha: "Oct. 11",
        hora: "9:00 AM",
        tv: "",
        evento: "Singapore Airlines Singapore GP",
        lugar: "Marina Bay Street Circuit"
    },
    {
        category: "F1",
        fecha: "Oct. 25",
        hora: "5:00 PM",
        tv: "",
        evento: "MSC Cruises United States GP",
        lugar: "Circuit of the Americas"
    },
    {
        category: "F1",
        fecha: "Nov. 1",
        hora: "5:00 PM",
        tv: "",
        evento: "Mexico City GP",
        lugar: "Autodromo Hermanos Rodriguez"
    },
    {
        category: "F1",
        fecha: "Nov. 8",
        hora: "2:00 PM",
        tv: "",
        evento: "MSC Cruises São Paulo GP",
        lugar: "Autodromo Jose Carlos Pace"
    },
    {
        category: "F1",
        fecha: "Nov. 22",
        hora: "1:00 AM",
        tv: "",
        evento: "Heineken Las Vegas GP",
        lugar: "Las Vegas Street Circuit"
    },
    {
        category: "F1",
        fecha: "Nov. 29",
        hora: "1:00 PM",
        tv: "",
        evento: "Qatar Airways Qatar GP",
        lugar: "Losail International Circuit"
    },
    {
        category: "F1",
        fecha: "Dic. 6",
        hora: "10:00 AM",
        tv: "",
        evento: "Etihad Airways Abu Dhabi GP",
        lugar: "Yas Marina Circuit"
    }
];

const ScheduledEvents = () => {
    const ufcEvents = scheduledEventsData.filter(e => e.category === 'UFC');
    const f1Events = scheduledEventsData.filter(e => e.category === 'F1');

    const EventTable = ({ events, title }) => (
        <div className="category-group">
            <h3 className="category-title">{title}</h3>
            <div className="table-container">
                <table className="scheduled-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>HORA</th>
                            <th>TV</th>
                            <th>Evento</th>
                            <th>Lugar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index} className="event-row">
                                <td className="date-cell">{event.fecha}</td>
                                <td className="time-cell">{event.hora}</td>
                                <td className="tv-cell">
                                    {event.tv ? (
                                        <span className={`tv-badge ${event.tv.toLowerCase()}`}>{event.tv}</span>
                                    ) : (
                                        <span className="tv-empty">-</span>
                                    )}
                                </td>
                                <td className="event-cell">
                                    <span className={`category-dot ${event.category.toLowerCase()}`}></span>
                                    {event.evento}
                                </td>
                                <td className="location-cell">{event.lugar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <section className="scheduled-events-section">
            <div className="section-header">
                <h2 className="section-title">Scheduled Events</h2>
                <div className="title-accent"></div>
            </div>
            
            <EventTable events={ufcEvents} title="UFC" />
            <EventTable events={f1Events} title="F1" />
        </section>
    );
};

export default ScheduledEvents;

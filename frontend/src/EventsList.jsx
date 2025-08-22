import { useEffect } from 'react';
import API from './api';

export function EventsList({ events, setEvents }) {
    useEffect(() => {
        API.get("/events")
            .then((res) => setEvents(res.data.events))
            .catch((err) => console.error(err));
    }, []);
    
    return (
        <div>
            <h3>Current Events</h3>
            <ul>
                {events.map((e) => (
                    <li key={e.id}>
                        <img src={e.image_url} alt={e.title} style={{ width: '200px', height: '100px' }} />
                        <div>{e.title}</div>
                        <div>{e.description}</div>
                        <div>{e.price}$</div>
                        <div>{e.location}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

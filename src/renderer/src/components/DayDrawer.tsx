import { Drawer, List, ListItem, Divider, ListItemText, Button } from "@mui/material";
import { on } from "events";

interface DayDrawerProps {
    open: boolean;
    onClose: () => void;
    day: number | null;
    events: any[];
    onEventAdd: (event: any) => void;
}
import { useNavigate } from "react-router-dom";

export default function DayDrawer({open, onClose, day, events, onEventAdd}) {
    const navigate = useNavigate();
    
    return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
    >
        <List>
            {events.map((event, index) => (
                <ListItem key={index}>
                    <ListItemText primary={event} />
                </ListItem>
            ))}
            <ListItem>
                {day !== null ? day : "No day selected"}
            </ListItem>
            <Divider />
            <Button onClick={onClose}>Close</Button>
            {day !== null && ( 
                    <Button onClick={() => onEventAdd('New Event')}>Add Event</Button>
                )}
           
        </List>
    </Drawer>
  );
}
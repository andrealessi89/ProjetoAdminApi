import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from 'react';


//FALTA INSERIR OS ICONES
const Menu = () => {
    
    const linksMenu = [
        {
            nome: "Teste1",
            icone: "MailIcon",
            route: "/teste-1"
        },
        {
            nome: "Teste2",
            icone: "InboxIcon",
            route: "/teste-2"
        },
    ]

    console.log(linksMenu);
    return (
        <List>
            {linksMenu.map((menu, index) => (
                <ListItem key={menu.nome} disablePadding>
                    <ListItemButton component={Link} to={menu.route}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <span className='textoMenu'>{menu.nome}</span>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default Menu;
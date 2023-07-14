import ForwardIcon from '@mui/icons-material/Forward';
import { Divider, Drawer,
  IconButton,
  List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import { Category } from '../types';

type DrawerCompProps = {
  list: Category[];
  handleClick: (name: string) => void;
};

function DrawerComp({ list, handleClick }: DrawerCompProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={ openDrawer }
        onClose={ () => setOpenDrawer(false) }
      >
        <List>
          <Typography p={ 1 } variant="h6" fontWeight="700">Categorias</Typography>
          <Divider />
          {list.map((item) => (
            <ListItemButton
              key={ item.id }
              onClick={ () => {
                handleClick(item.name);
                setOpenDrawer(false);
              } }
            >
              <ListItemText sx={ { color: '#94979D;' } }>
                {item.name}
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={ () => setOpenDrawer(!openDrawer) }>
        <ForwardIcon />
      </IconButton>
    </>
  );
}

export default DrawerComp;

import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList } from 'react-window';
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
}));



export default function VirtualizedList() {
    const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get("https://randomuser.me/api/?page=3&results=10&seed=abc").then(res=>{
        console.log(res)
        setData(res.data.results)
    })
    .catch(err=>{
        console.log(err)
    })
  }, []);
  function renderRow(props) {
    const { index, style } = props;

 
    return (
    
            data.length?<ListItem button style={style} key={index} >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={data[index%10].name.title=="Mr"?"https://randomuser.me/api/portraits/men/"+index%100+".jpg":"https://randomuser.me/api/portraits/women/"+index%100+".jpg"}/>
              </ListItemAvatar>
              <ListItemText
                primary={data[index%10].name.title+" "+data[index%10].name.first+" "+data[index%10].name.last}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                       { data[index%10].email}
                    </Typography>
                    <div>
                    { " Mobile: - "+data[index%10].cell}
                    </div>
                  </React.Fragment>
                }
              />
          </ListItem>:index==1?<div className="text-center"><LinearProgress/><CircularProgress disableShrink style={{marginTop:"50%"}} /></div>:''
        
    );
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  return (
    <div className="container-fluid mt-5">
    <div className="row ">
        <div className="col-md-6 offset-md-5">
    <div className={classes.root}>
     <FixedSizeList height={600} width={300} itemSize={80} itemCount={1000000000}>
        {renderRow}
      </FixedSizeList>

    </div>
    
    </div>
         </div>
     </div>
  );
}

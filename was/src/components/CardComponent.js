import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import samplevideo from '../assets/samplevideo.mp4'

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
});

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="video"
                    alt="Water"
                    height="140"
                    src=''
                    title="Intelligent Farming"
                    controls
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Water is Precious
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Water is the most precious resource of our life. Saving water means saving life. Watch this short video about how intelligent farming techniques help in conserving the most precious resource.
          </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { blue, green, pink, red, deepPurple, purple, blueGrey, teal } from '@mui/material/colors';
import Filter1TwoToneIcon from '@mui/icons-material/Filter1TwoTone';
import Filter2TwoToneIcon from '@mui/icons-material/Filter2TwoTone';
import Filter3TwoToneIcon from '@mui/icons-material/Filter3TwoTone';
import Filter4TwoToneIcon from '@mui/icons-material/Filter4TwoTone';
import Filter5TwoToneIcon from '@mui/icons-material/Filter5TwoTone';
import Filter6TwoToneIcon from '@mui/icons-material/Filter6TwoTone';
import Filter7TwoToneIcon from '@mui/icons-material/Filter7TwoTone';
import Filter8TwoToneIcon from '@mui/icons-material/Filter8TwoTone';
import mimeWhiteIcon from './mimeWhiteIcon.png';
import mimeRedIcon from './mimeRedIcon.png';
import mimeBlackIcon from './mimeBlackIcon.png';
import IOSContextMenuHandler from './iosContextMenuHandler.js';
import { isIOS } from 'react-device-detect';
import { useState } from 'react';

BoardSquare.propTypes = {
    numOfMimeNeighbors: PropTypes.number,
    indexI: PropTypes.number,
    indexJ: PropTypes.number,
    btnLeftClickCallback: PropTypes.func,
    btnRightClickCallback: PropTypes.func
}

function BoardSquare(props) {
    var btnSize = '40px';

    const isDeviceIOS = useState(isIOS);

    console.log("ios", isDeviceIOS);

    const contextMenuHandler = new IOSContextMenuHandler(
        () => {
            setLeftClickState();
        },
        () => {
            setRightClickState();
        }
    );

    const setLeftClickState = () => {
        props.btnLeftClickCallback(props.indexI, props.indexJ);
    };

    const setRightClickState = () => {
        props.btnRightClickCallback(props.indexI, props.indexJ);
    };

    if (isDeviceIOS[0]) {
        if (props.numOfMimeNeighbors >= 9) {
            return <Button variant="contained"
                onTouchStart={contextMenuHandler.onTouchStart}
                onTouchCancel={contextMenuHandler.onTouchCancel}
                onTouchEnd={contextMenuHandler.onTouchEnd}
                onTouchMove={contextMenuHandler.onTouchMove}
                onContextMenu={(e)=> e.preventDefault()}
                onClick={(e)=> e.preventDefault()}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}
                color={getButtonColor(props.numOfMimeNeighbors)}>
                <img src={mimeWhiteIcon} width="24px" height="24px" alt="White Mime" />
            </Button>;
        } else if (Math.floor(props.numOfMimeNeighbors) !== props.numOfMimeNeighbors) {
            return <Button variant="contained"
                onTouchStart={contextMenuHandler.onTouchStart}
                onTouchCancel={contextMenuHandler.onTouchCancel}
                onTouchEnd={contextMenuHandler.onTouchEnd}
                onTouchMove={contextMenuHandler.onTouchMove}
                onContextMenu={(e)=> e.preventDefault()}
                onClick={(e)=> e.preventDefault()}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}>
            </Button>;
        } else {
            return <Button variant="outlined" disabled={true}
                onTouchStart={contextMenuHandler.onTouchStart}
                onTouchCancel={contextMenuHandler.onTouchCancel}
                onTouchEnd={contextMenuHandler.onTouchEnd}
                onTouchMove={contextMenuHandler.onTouchMove}
                onContextMenu={(e)=> e.preventDefault()}
                onClick={(e)=> e.preventDefault()}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}>
                {getIcon(props.numOfMimeNeighbors)}
            </Button>;
        }
    } else {
        if (props.numOfMimeNeighbors >= 9) {
            return <Button variant="contained"
                onClick={setLeftClickState}
                onContextMenu={setRightClickState}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}
                color={getButtonColor(props.numOfMimeNeighbors)}>
                <img src={mimeWhiteIcon} width="24px" height="24px" alt="White Mime" />
            </Button>;
        } else if (Math.floor(props.numOfMimeNeighbors) !== props.numOfMimeNeighbors) {
            return <Button variant="contained"
                onClick={setLeftClickState}
                onContextMenu={setRightClickState}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}>
            </Button>;
        } else {
            return <Button variant="outlined" disabled={true}
                onClick={setLeftClickState}
                onContextMenu={setRightClickState}
                style={{ maxWidth: btnSize, maxHeight: btnSize, minWidth: btnSize, minHeight: btnSize }}>
                {getIcon(props.numOfMimeNeighbors)}
            </Button>;
        }
    }
}

function getIcon(numOfMimeNeighbors) {
    switch (numOfMimeNeighbors) {
        case -2:
            return <img src={mimeRedIcon} width="30px" height="30px" alt="Red Mime" />;
        case -1:
            return <img src={mimeBlackIcon} width="24px" height="24px" alt="Black Mime" />;
        case 1:
            return <Filter1TwoToneIcon sx={{ color: blue[500] }} />;
        case 2:
            return <Filter2TwoToneIcon sx={{ color: green[500] }} />;
        case 3:
            return <Filter3TwoToneIcon sx={{ color: pink[300] }} />;
        case 4:
            return <Filter4TwoToneIcon sx={{ color: purple[300] }} />;
        case 5:
            return <Filter5TwoToneIcon sx={{ color: teal[500] }} />;
        case 6:
            return <Filter6TwoToneIcon sx={{ color: deepPurple[500] }} />;
        case 7:
            return <Filter7TwoToneIcon sx={{ color: blueGrey[500] }} />;
        case 8:
            return <Filter8TwoToneIcon sx={{ color: red[500] }} />;
        default:
            return null;
    }
}

function getButtonColor(numOfMimeNeighbors) {
    if (numOfMimeNeighbors % 1 === 0) {
        return (numOfMimeNeighbors >= 10) ? "error" : "success"
    }

    return "warning";
}

export default BoardSquare;

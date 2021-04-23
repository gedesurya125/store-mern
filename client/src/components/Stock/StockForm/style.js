import {makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
	inputFile: {
		marginTop: '0.5em',
		border: '1px solid #C4C4C4',
		padding: '0.5em',
		borderRadius: '0.3em',
		position: 'relative',
	},

	button: {
		margin: '0 0.5em',
	},

	previewImg: {	
		maxWidth: '100%',
		marginTop: '0.5em'
	},

	progress: {
		minWidth: '50%',
		marginTop: '1em',
	},

	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#ffff',
	}
	

	})
);
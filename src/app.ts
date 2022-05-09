import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutesUsers } from './routes';

initApp();
initConnection()
	.then(() => {
		startApp(process.env.PORT || 7000);
		initRoutesUsers();
	})
	.catch(err => console.error(err));

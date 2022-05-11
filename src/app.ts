import { initApp, startApp } from './services/app.service';
import { initConnection } from './services/db.service';
import { initRoutesPoems } from './routes';

initApp();
initConnection()
	.then(() => {
		startApp(process.env.PORT || 7000);
		initRoutesPoems();
	})
	.catch(err => console.error(err));

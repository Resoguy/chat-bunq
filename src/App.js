import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { HomePage, LoginPage } from './pages';
import {Toolbar} from './components';
import GuardedRoute from './guards/GuardedRoute';
import s from './App.module.scss';


function App() {
    return (
        <Router>
            <div className={s.app}>
                <Toolbar />

                <div className={s.appContent}>
                    <Switch>
                        <GuardedRoute path="/" exact>
                            <HomePage />
                        </GuardedRoute>

                        <GuardedRoute type="public" path="/login">
                            <LoginPage />
                        </GuardedRoute>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;

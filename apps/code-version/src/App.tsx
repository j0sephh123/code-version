import { Route } from 'wouter';
import TheHeader from './components/TheHeader/TheHeader';
import CodeVersionsPage from './pages/CodeVersionsPage';
import SingleCodeVersionPage from './pages/SingleCodeVersionPage';
import HomePage from './pages/HomePage';
import CreateSnippetDialog from './components/Dialog/Dialog';

export default function App() {
  return (
    <>
      <TheHeader />
      <div className="p-4">
        <Route path="/code-versions/:id">
          {({ id }) => <SingleCodeVersionPage id={id} />}
        </Route>
        <Route path="/code-versions" component={CodeVersionsPage} />
        <Route path="/" component={HomePage} />
      </div>
      <CreateSnippetDialog />
    </>
  );
}

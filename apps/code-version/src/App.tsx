import { Route } from 'wouter';
import TheHeader from './components/TheHeader/TheHeader';
import SingleCodeVersionPage from './components/pages/SingleCodeVersionPage';
import CodeVersionsPage from './components/pages/CodeVersionsPage';

export default function App() {
  return (
    <>
      <TheHeader />
      <div className="p-4">
        <Route path="/code-versions/:id">
          {({ id }) => <SingleCodeVersionPage id={id} />}
        </Route>
        <Route path="/code-versions" component={CodeVersionsPage} />
        <Route path="/" component={() => <div>Welcome to hoem page</div>} />
      </div>
    </>
  );
}

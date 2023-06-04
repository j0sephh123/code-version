import { Route } from 'wouter';
import TheHeader from './components/TheHeader/TheHeader';
import mockBlocks from './mockBlocks';
import CodeVersionsPage from './pages/CodeVersionsPage';
import SingleCodeVersionPage from './pages/SingleCodeVersionPage';

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

        {/* <CodeVersion block={block} /> */}
      </div>
    </>
  );
}

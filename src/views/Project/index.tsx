import PageBreadcrumbs from 'components/common/PageBreadcrums';
import PageWrapper from 'components/common/PageWrapper';
import { Outlet } from 'react-router-dom';

export default function Project() {
  return (
    <PageWrapper title="Project">
      <PageBreadcrumbs category="Project" title="" breadcrumbs={[]} />
      <Outlet />
      {/* <CRUDTable /> */}
    </PageWrapper>
  );
}

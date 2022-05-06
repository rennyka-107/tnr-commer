import PageBreadcrumbs from 'components/common/PageBreadcrums';
import PageWrapper from 'components/common/PageWrapper';
import { Outlet } from 'react-router-dom';

export default function System() {
  return (
    <PageWrapper title="System">
      <PageBreadcrumbs category="System" title="" breadcrumbs={[]} />
      <Outlet />
      {/* <CRUDTable /> */}
    </PageWrapper>
  );
}

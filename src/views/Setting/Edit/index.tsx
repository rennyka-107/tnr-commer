import PageBreadcrumbs from 'components/common/PageBreadcrums';
import PageWrapper from 'components/common/PageWrapper';
import { useMemo } from 'react';
import EditCompany from './EditCompany';

const getBreadcrums = () => [
  {
    text: 'Company Detail',
    link: '/crm/accounts/',
  },
];

const EditCRUD = () => {
  const breadcrumbs = useMemo(() => getBreadcrums(), []);

  return (
    <PageWrapper title="Company | Edit">
      <PageBreadcrumbs
        category="Company"
        title="Edit"
        breadcrumbs={breadcrumbs}
      />
      <EditCompany />
    </PageWrapper>
  );
};

export default EditCRUD;

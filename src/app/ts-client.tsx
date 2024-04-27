import { Cards } from 'nextra/components';
import { NavigationCardGeneratorSSR } from './components/navigationCardGenerator/navigationCardGenerator';
import { ReadMetaJSON } from './components/navigationCardGenerator/readMetaJSON';

export const navigationCardFilePaths = ['/pages/docs/engine/clients/ts-client'];

export async function getStaticProps() {
  const navigationCardContent = await ReadMetaJSON(navigationCardFilePaths);
  return {
    props: {
      ssg: {
        navigationCardContent: navigationCardContent,
      },
    },
  };
}

<Cards>
  <NavigationCardGeneratorSSR filePath="/pages/docs/engine/clients/ts-client" />
</Cards>

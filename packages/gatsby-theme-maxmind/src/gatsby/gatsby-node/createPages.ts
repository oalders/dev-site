import { CreatePagesArgs, GatsbyNode, PluginOptions } from 'gatsby';

import createMdxPages from './pages/createMdxPages';

export const createPages: GatsbyNode['createPages'] = async (
  props: CreatePagesArgs,
  options: PluginOptions,
) => {
  await Promise.all([
    createMdxPages(props, options),
  ]);
};

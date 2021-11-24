/* eslint-disable filenames/match-exported */
import { CreatePagesArgs, PluginOptions } from 'gatsby';

import { IBaseQuery } from '../../../baseQuery';

const createMdxPages = async (
  args: CreatePagesArgs,
  options: PluginOptions,
): Promise<any> => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  // console.log(options.templates);

  const queries: (
    (graphql: any) => Promise<any>
  )[] = (options as any).templates.map(
    async (template: any) => await import(template.query)
      .then(r => r.default)
  );

  return Promise.all(
    queries.map(async (queryPromise) => {
      const query = await queryPromise;
      const result = await query(graphql);

      if (result.errors) {
        reporter.panicOnBuild('🚨 ERROR: error!');
        console.log(result.errors);
        throw new Error(`🚨 ERROR: Loading "${query.name}" query`);
      }

      if (!result.data) {
        reporter.panicOnBuild('🚨 ERROR: No data!');
        throw new Error('🚨 ERROR: No data!');
      }

      result.data.allMdx.nodes.forEach((node: IBaseQuery) => {
        if (
          process.env.gatsby_executing_command === 'develop'
          || !node.frontmatter.draft
        ) {
          createPage({
            component: node.fileAbsolutePath,
            context: node,
            path: node.fields.slug,
          });
        }
      });
    })
  );
};

export default createMdxPages;

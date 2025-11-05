import React from 'react';

import {
  Field,
  Text,
  withDatasourceCheck,
  ComponentParams,
  ComponentRendering,
  GetComponentServerProps,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Name: string;
  ShortDesc: string;
  LongDesc: string;
}
type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};
type TitleAndTextProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const TitleAndTexts = (props: TitleAndTextProps): React.ReactElement => {
  console.log('props', props.fields.Name);
  const containerStyles = props.params && props.params.styles ? props.params.styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();

  return (
    <div className={`container-default component ${styles}`}>
      <div data-class-change className={containerStyles}>
        This container must be refreshed without reloading the page.
      </div>
      <h1 className="component-content title row">
        <Text field={props.fields.Title} />
      </h1>
      <div className="component-content text row">
        <Text field={props.fields.Text} />
      </div>
      <div className="component-content text row">
        <h1>{props.fields.Name}</h1>
        <h2>{props.fields.ShortDesc}</h2>
        <h3>{props.fields.LongDesc}</h3>
      </div>
    </div>
  );
};
const fetchPost = () =>
  fetch(
    'https://watts-dev-ods.azurewebsites.net/restapi/api/watts/ods/products/8f0b8be1-e8d3-4c66-8a1b-115ba3083436/'
  ).then((res) => res.json());
export const getComponentServerProps: GetComponentServerProps = async (rendering) => {
  const post = await fetchPost();
  //console.log("post",post);
  if (rendering.fields) {
    rendering.fields.Name = post?.Versions[0].Name;
    rendering.fields.ShortDesc = post?.Versions[0].ShortDescription;
    rendering.fields.LongDesc = post?.Versions[0].LongDescription;
  }
  return {
    props: {
      fields: {
        Name: post?.Versions[0].ShortDescription,
      },
    },
  };
  // return post;
};
export default withDatasourceCheck()<TitleAndTextProps>(TitleAndTexts);

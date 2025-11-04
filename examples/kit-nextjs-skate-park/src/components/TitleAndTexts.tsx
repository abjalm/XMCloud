import React from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import useSWR from 'swr';
interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Text1: Field<string>;
}

type TitleAndTextProps = {
  params: { [key: string]: string };
  fields: Fields;
  product?: any; // Add proper type definition based on your API response
};

export const Default = (props: TitleAndTextProps): React.ReactElement => {
  const containerStyles = props.params && props.params.styles ? props.params.styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const {isLoading,data}=useSWR(
    'https://ods-prod.watts.com/restapi/api/watts/ods/products/8f0b8be1-e8d3-4c66-8a1b-115ba3083436',{fallbackData:props.product});

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
        <Text field={props.fields.Text1} />
      </div>
     <div><span>Short Description</span>{isLoading?'Loading..':data.Versions[0].ShortDescription}</div>
     <div><span>Long Description</span>{isLoading?'Loading..':data.Versions[0].LongDescription}</div>
    </div>
  );
};

export const getServerSideProps = async (_rendering, layoutData) => {
  const isEditing = layoutData.sitecore.context.pageEditing;
  if(!isEditing) {
    return { props: {} };
  }
  return{
    props: {
      product: "Sample Product Short Description",
    }
  }
 /*  console.log("https://ods-prod.watts.com/restapi/api/watts/ods/products/8f0b8be1-e8d3-4c66-8a1b-115ba3083436");
  const pimData = await fetch("https://ods-prod.watts.com/restapi/api/watts/ods/products/8f0b8be1-e8d3-4c66-8a1b-115ba3083436");
  const data = await pimData.json();
  console.log("PIM Data:", data);
  return {
    props: {
      product: data?.Versions[0]
    }
  }; */
};
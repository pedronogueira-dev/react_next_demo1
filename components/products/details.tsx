import { Product } from "@/types/products/product";
import { Card, DataList, Flex, Skeleton, Text } from "@radix-ui/themes";

ProductDetailsView.Bottom = function({description}: { description: string}): JSX.Element {
  return (
    <Card>
      <Text color={"orange"}>
        {description}
      </Text>
    </Card>
  )
}

ProductDetailsView.Datalist = function({product}: {product: Product | undefined}): JSX.Element {
  return (
    <DataList.Root>
        <DataList.Item align="center">
            <DataList.Item>
                <Skeleton loading={product === undefined}>
                    <DataList.Label>Id</DataList.Label>
                </Skeleton>
                <Skeleton loading={product === undefined}>
                    <DataList.Value>{product?.id}</DataList.Value>
                </Skeleton>
            </DataList.Item>
            <DataList.Item align="center">
                <Skeleton loading={product === undefined}>
                    <DataList.Label>Name</DataList.Label>
                </Skeleton>
                <Skeleton loading={product === undefined}>
                    <DataList.Value>{product?.name}</DataList.Value>
                </Skeleton>
            </DataList.Item>
        </DataList.Item>
    </DataList.Root>
  )
}

export default function ProductDetailsView({children }: {children?: JSX.Element[]}) {
  return (
    <Flex align={"center"} p={"2"}>
      {children}
    </Flex>
  );
}
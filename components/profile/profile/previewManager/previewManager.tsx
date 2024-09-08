import React, { FC } from "react";

interface PreviewManagerProps {
  block: Block | null;
  components: Components;
}

const PreviewManager: FC<PreviewManagerProps> = ({
  block,
  components,
}: PreviewManagerProps) => {
  if (block === null) {
    return <></>;
  }

  function renderBlock() {
    if (block!.blockTag !== "undefined") {
      return React.createElement(components[block!.blockTag], {
        key: block!._id,
        block: block,
      });
    }
  }

  return <>{renderBlock()}</>;
};

export default PreviewManager;

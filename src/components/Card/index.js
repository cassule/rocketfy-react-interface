import React, { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

import { Container, Label } from "./styles";

export default function Card({ data, index }) {
  const ref = useRef();

  const [{ isDraggin }, dragRef] = useDrag({
    item: { type: "CARD", index },
    collect: monitor => ({
      isDraggin: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if(draggedIndex > targetIndex && draggedTop > targetCenter){
        return;
      }

      console.log("Okay");
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDraggin={isDraggin}>
      <header>
        {data.labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
}

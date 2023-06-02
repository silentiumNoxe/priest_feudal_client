document.addEventListener('DOMContentLoaded', function() {
    const stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
  
    const landLayer = new Konva.Layer();
    const objectLayer = new Konva.Layer();
  
    stage.add(objectLayer);
  
    window.landLayer = landLayer;
    window.objectLayer = objectLayer;
});
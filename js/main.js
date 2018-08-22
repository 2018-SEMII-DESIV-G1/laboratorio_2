(function() {
    let module = {
        htmlElements: {
            solutionForm: $('.solution-input-js'),
            resultWrapper: $('.result-wrapper-js'),
            resultText: $('.result-txt-js'),
        },
        // Initialization
        init: function(){
            module.bindEvents();
        },
        // Even Binding
        bindEvents: function(){
            module.htmlElements.solutionForm.on('change', module.handleChangeFileInput);
        },
        // Event Handlers
        handleChangeFileInput: function(e){
            let input = module.htmlElements.solutionForm.get(0);
            var reader = new FileReader();
            if (input.files.length) {
                var textFile = input.files[0];
                reader.readAsText(textFile);
                reader.onloadend = module.processFile;
            } else {
                alert('Por favor elija un archivo.');
            } 
        },
        // Utilities
        processFile: function(e){
            if(e.target.readyState == FileReader.DONE){
                let pyramid = module.getArraysFromTxt(e.target.result);
                module.getResult(pyramid);
            }
        },
        getArraysFromTxt: function(txt){
            return txt.split('\n').map(row => row.split(" ").map(num => parseInt(num)));
        },
        getResult: function(pyramid){
            function reducer(){
                let lastLine = pyramid.pop();
                let penultimateLine = pyramid.pop();
                for(let i = 0; i < penultimateLine.length; i++){
                    penultimateLine[i] = Math.max(penultimateLine[i] + lastLine[i],
                                                  penultimateLine[i] + lastLine[i + 1]);
                }
                pyramid.push(penultimateLine);
            }
            while(pyramid.length > 1){
                reducer();
            }
            module.drawResponse(pyramid[0][0]);
        },
        drawResponse: function(r){
            module.htmlElements.resultWrapper.removeClass('d-none');
            module.htmlElements.resultText.text(r);
        }
    }
    window.module = module;
})();
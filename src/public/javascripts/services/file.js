import noteDetailService from "./note_detail.js";
import treeService from "./tree.js";
import server from "./server.js";

function uploadFile() {
    $("#file-upload").trigger('click');
}

$("#file-upload").change(async function() {
    const formData = new FormData();
    formData.append('upload', this.files[0]);

    const resp = await $.ajax({
        url: baseApiUrl + 'notes/' + noteDetailService.getCurrentNoteId() + '/upload',
        headers: server.getHeaders(),
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS
        processData: false, // NEEDED, DON'T OMIT THIS
    });

    await treeService.reload();

    await treeService.activateNote(resp.noteId);
});

export default {
    uploadFile
}
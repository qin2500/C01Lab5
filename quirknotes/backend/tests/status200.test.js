test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

  const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {

  const deleteNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes.json();
  
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getAllNotesBody = await getAllNotesRes.json();


  expect(getAllNotesRes.status).toBe(200);
  expect(len(getAllNotesBody)).toBe(0);

});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {

  const deleteNotesRes1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes1.json();

  const note1 = {title: "Note 1", content: "Content 1" };
  const note2 = {title: "Note 2", content: "Content 2" };

  const postNote1Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note1),
  });
  const postNote1Body = await postNote1Res.json();

  const postNote2Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note2),
  });
  const postNote2Body = await postNote2Res.json();

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const getAllNotesBody = await getAllNotesRes.json();
 
  const deleteNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  await deleteNotesRes2.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(len(getAllNotesBody)).toBe(2);
  expect(getAllNotesBody[0].title).toBe("Note 1");
  expect(getAllNotesBody[1].title).toBe("Note 2");
});

test("/deleteNote - Delete a note", async () => {
  //create note
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const poo = await deleteNoteRes.json();
  expect(deleteNoteRes.status).toBe(200);
  expect(poo.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  
});

test("/patchNote - Patch with content and title", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  
  const patchRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const poo = await patchRes.json();
  expect(patchRes.status).toBe(200);
  expect(poo.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

});

test("/patchNote - Patch with just title", async () => {
    //create a new note first
    const title = "NoteTitleTestPatch";
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "1",
            content: "1",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    //patch the new note
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title
        }),
    });

    const patchNoteBody = await patchNoteRes.json()

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
    //create a new note first
    const content = "NoteTitleContentPatch";
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "1",
            content: "1",
        }),
    });
    const postNoteBody = await postNoteRes.json();

    //patch the new note
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content
        }),
    });

    const patchNoteBody = await patchNoteRes.json()
    
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
    
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    //Reset first
    let deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      }
    });

    //Add one note 
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: "1",
          content: "1",
      }),
    });

    //Delete that one note
    deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      }
    });

    const deleteNoteBody = await deleteNoteRes.json()
    
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`1 note(s) deleted.`);
  });

test("/deleteAllNotes - Delete three notes", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    expect(deleteAllRes.status).toBe(200);

    const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody1 = await postNoteRes1.json();

    expect(postNoteRes1.status).toBe(200);
    expect(postNoteBody1.response).toBe("Note added succesfully.");

    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody2 = await postNoteRes2.json();

    expect(postNoteRes2.status).toBe(200);
    expect(postNoteBody2.response).toBe("Note added succesfully.");

    const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody3 = await postNoteRes3.json();

    expect(postNoteRes3.status).toBe(200);
    expect(postNoteBody3.response).toBe("Note added succesfully.");
    
    const deleteAllRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    const deleteAllBody2 = await deleteAllRes2.json();

    expect(deleteAllRes2.status).toBe(200);
    expect(deleteAllBody2.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
    
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const color = "#FF0000"
    console.log(postNoteBody.insertedId)
    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        color: color,
        }),
    })

    const updateNoteColorBody = await updateNoteColorRes.json();
    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe("Note color updated successfully.")
});
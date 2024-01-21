import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { toast } from "sonner";
import { SERVER_URL } from "../../config";

const NoteForm = ({ children, title, initial, categories, getNotes }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues_] = useState(initial);
  const catRef = useRef();

  const setDefaultCategories = () => {
    if (initial.categories) {
      const categoriesArray = initial.categories.map((c) => {
        return { label: c.name.toUpperCase(), value: c.id };
      });
      catRef.current.setValue(categoriesArray);
    }
  };

  useEffect(() => {
    if (catRef.current) {
      setDefaultCategories();
    }
  }, [isOpen]);

  const setValues = (e) => {
    setValues_((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const setArrayValues = (e) => {
    const catArray = e.map((item) => item.value);
    setValues_((prevValues) => {
      return {
        ...prevValues,
        categories: catArray,
      };
    });
  };

  const refreshValues = () => {
    setValues_(initial);
    if (initial.categories) {
      const categoriesArray = initial.categories.map((c) => {
        return { label: c.name.toUpperCase(), value: c.id };
      });
      catRef.current.setValue(categoriesArray);
    }
  };

  const Onsave = async () => {
    refreshValues();

    const promise = () =>
      new Promise((resolve) => {
        let body = {
          newNote: { description: values.description },
          categories: values.categories ? values.categories : [],
        };
        if (values.id) {
          body.newNote.id = values.id;
          body.newNote.archived = values.archived;
        }
        const options = {
          method: initial.description ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(body),
        };
        fetch(`${SERVER_URL}/notes`, options)
          .then((data) => data.json())
          .then((res) => resolve(res));
      });

    toast.promise(promise, {
      loading: initial.description
        ? "Updating Note, please wait until completion."
        : "Creating Note, please wait until completion.",
      success: (data) => {
        return initial.description
          ? "Success updating Note!"
          : "Success creating Note!";
      },
      error: "Something went wrong, try again later.",
    });

    setTimeout(() => {
      getNotes();
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center" onClick={onOpen}>
        {children}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-slate-900">
                {title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 text-sm">Description</label>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={setValues}
                    className="bg-white border rounded-md p-1 text-slate-800 h-[100px] resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 text-sm">Categories</label>
                  <Select
                    ref={catRef}
                    isClearable={true}
                    isSearchable={false}
                    isMulti
                    onChange={setArrayValues}
                    options={categories.map((c) => {
                      return { label: c.name.toUpperCase(), value: c.id };
                    })}
                    maxMenuHeight={100}
                    className="text-sm text-slate-900"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 1,
                      colors: {
                        ...theme.colors,
                        primary25: "#00000010",
                        primary: "#bf78f570",
                      },
                      spacing: {
                        baseUnit: 3,
                        controlHeight: 26,
                        menuGutter: 3,
                      },
                    })}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    refreshValues();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    Onsave();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteForm;

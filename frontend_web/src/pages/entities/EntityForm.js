import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import Input from '../../components/forms/Input';
import Select from '../../components/forms/Select';
import Modal from '../../components/modals/Modal';
import { GET_ENTITIES, UPDATE_ENTITY } from '../../helpers/GraphQL';

function EntityForm({ entity, onClose }) {
    console.log(entity)

    const initData = new Map()
    initData['id'] = entity.id
    initData['name'] = entity.name
    initData['gender'] = "M"
    const setData = ({ key, val }) => {
        initData[key] = entity.person ? entity.person[key] : val
    }
    const pFields = [
        { key: 'gender', val: 'M' },
        { key: 'isMarried', val: false },
        { key: 'isBaptized', val: false },
    ]
    pFields.forEach((f) => setData(f))

    initData['isMember'] = entity.isMember === "Yes"
    const [formData, setFormData] = useState(initData)
    const [updateEntity, { }] = useMutation(UPDATE_ENTITY);
    const handleChange = (e) => {
        let { name, type } = e.target
        let value = type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        updateEntity({
            variables: {
                ...formData
            },
            refetchQueries: () => [
                { query: GET_ENTITIES },
            ],
            awaitRefetchQueries: true,
        }).then(
            (res) => {
                console.log(res)
                onClose()
            },
            (res) => {
                console.log("Error: ", res)
            }
        );
        e.preventDefault()
    }
    return (
        <Modal onClose={onClose} title={entity.name}>
            <form className="form" onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label="Entity Name"
                    type="text"
                    required
                    value={formData["name"]}
                    onChange={handleChange}
                />
                <Input
                    name="isMember"
                    label="Is Member"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData["isMember"]}
                />
                {formData['isMember'] && <>
                    <Select
                        name="gender"
                        label="Gender"
                        type="select"
                        defaultValue={formData["gender"]}
                        onChange={handleChange}
                        options={[{ id: 'F', name: "Female" }, { id: 'M', name: "Male" }]}
                    />
                    <Input
                        name="isMarried"
                        label="Is Married"
                        type="checkbox"
                        onChange={handleChange}
                        checked={formData["isMarried"]}
                    />
                    <Input
                        name="isBaptized"
                        label="Is Baptized"
                        type="checkbox"
                        onChange={handleChange}
                        checked={formData["isBaptized"]}
                    />
                </>}
                <div className="form-footer">
                    <button>Submit</button>
                </div>
            </form>
        </Modal>
    );
}

export default EntityForm;